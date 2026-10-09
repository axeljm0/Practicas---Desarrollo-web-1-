<template>
  <div class="form-wrapper">
    <!-- Success Modal / View -->
    <div v-if="submittedSuccess" class="form-card success-card">
      <div class="success-icon-wrapper">
        <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2 class="success-title">Application Submitted!</h2>
      <p class="success-subtitle">
        Thank you, <strong>{{ formData.personal.firstName }} {{ formData.personal.lastName }}</strong>. Your application has been received.
      </p>

      <div class="submission-details">
        <div class="detail-row">
          <span class="detail-label">Application ID:</span>
          <span class="detail-value highlight">{{ submissionResult?.id }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Position:</span>
          <span class="detail-value">{{ formData.professional.position || 'General Application' }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value">{{ formData.contact.email }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Storage Status:</span>
          <span class="detail-badge" :class="submissionResult?.source === 'firestore' ? 'badge-firestore' : 'badge-local'">
            {{ submissionResult?.source === 'firestore' ? 'Cloud Firestore' : 'Local Storage Backup' }}
          </span>
        </div>
      </div>

      <p v-if="submissionResult?.warning" class="storage-notice">
        ℹ️ {{ submissionResult.warning }}
      </p>

      <div class="success-actions">
        <button type="button" class="btn btn-secondary" @click="downloadApplicationJSON">
          📥 Download Copy (JSON)
        </button>
        <button type="button" class="btn btn-primary" @click="resetForm">
          Apply Again
        </button>
      </div>
    </div>

    <!-- Main Application Form -->
    <div v-else class="form-card">
      <!-- Header -->
      <header class="form-header">
        <div class="header-content">
          <h1 class="main-title">
            Job Application — {{ viewMode === 'wizard' ? 'Multi-Step Wizard' : 'Traditional Long Form' }}
          </h1>
          <p class="main-subtitle">
            {{ viewMode === 'wizard' 
                ? 'Step-by-step application wizard. Fast, validated and auto-saved.' 
                : 'One long page, no steps. Great to contrast with your multi-step wizard.' }}
          </p>
        </div>

        <!-- Controls: View Mode Switcher & Reset -->
        <div class="header-controls">
          <div class="view-toggle" role="group" aria-label="View mode toggle">
            <button 
              type="button"
              class="toggle-btn"
              :class="{ active: viewMode === 'wizard' }"
              @click="viewMode = 'wizard'"
            >
              🧙‍♂️ Multi-Step Wizard
            </button>
            <button 
              type="button"
              class="toggle-btn"
              :class="{ active: viewMode === 'longform' }"
              @click="viewMode = 'longform'"
            >
              📄 Long Form
            </button>
          </div>

          <button 
            type="button" 
            class="reset-btn" 
            title="Clear all fields and draft" 
            @click="confirmReset"
          >
            Clear Draft
          </button>
        </div>
      </header>

      <!-- Stepper Progress Bar (Only visible in wizard mode) -->
      <div v-if="viewMode === 'wizard'" class="stepper-container">
        <div class="stepper-progress-track">
          <div 
            class="stepper-progress-fill" 
            :style="{ width: ((currentStep - 1) / (steps.length - 1)) * 100 + '%' }"
          ></div>
        </div>

        <div class="stepper-steps">
          <div 
            v-for="(step, idx) in steps" 
            :key="step.id"
            class="stepper-item"
            :class="{
              active: currentStep === idx + 1,
              completed: currentStep > idx + 1
            }"
            @click="jumpToStep(idx + 1)"
          >
            <div class="step-circle">
              <span v-if="currentStep > idx + 1">✓</span>
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <span class="step-label">{{ step.label }}</span>
          </div>
        </div>
      </div>

      <!-- General Submission Error Alert -->
      <div v-if="submitErrorMessage" class="alert-box alert-error">
        {{ submitErrorMessage }}
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleFormSubmit" novalidate>
        
        <!-- SECTION 1: Personal Information -->
        <section 
          v-show="viewMode === 'longform' || currentStep === 1" 
          class="form-section-box"
          :class="{ 'step-fade-in': viewMode === 'wizard' }"
        >
          <div class="badge-pill">Personal Information</div>

          <div class="grid-row grid-2">
            <div class="field-group" :class="{ 'has-error': errors.firstName }">
              <label for="firstName">First Name <span class="req">*</span></label>
              <input 
                id="firstName" 
                type="text" 
                v-model.trim="formData.personal.firstName" 
                placeholder="e.g. Jane"
                @input="clearError('firstName')"
              />
              <span v-if="errors.firstName" class="error-text">{{ errors.firstName }}</span>
            </div>

            <div class="field-group" :class="{ 'has-error': errors.lastName }">
              <label for="lastName">Last Name <span class="req">*</span></label>
              <input 
                id="lastName" 
                type="text" 
                v-model.trim="formData.personal.lastName" 
                placeholder="e.g. Doe"
                @input="clearError('lastName')"
              />
              <span v-if="errors.lastName" class="error-text">{{ errors.lastName }}</span>
            </div>
          </div>

          <div class="grid-row grid-2">
            <div class="field-group">
              <label for="middleName">Middle Name <span class="optional">(optional)</span></label>
              <input 
                id="middleName" 
                type="text" 
                v-model.trim="formData.personal.middleName" 
                placeholder="Middle name"
              />
            </div>

            <div class="field-group" :class="{ 'has-error': errors.dob }">
              <label for="dob">Date of Birth <span class="req">*</span></label>
              <input 
                id="dob" 
                type="date" 
                v-model="formData.personal.dob"
                @input="clearError('dob')"
              />
              <span v-if="errors.dob" class="error-text">{{ errors.dob }}</span>
            </div>
          </div>

          <div class="field-group" :class="{ 'has-error': errors.gender }">
            <label class="group-label">Gender <span class="req">*</span></label>
            <div class="radio-options">
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="gender" 
                  value="Male" 
                  v-model="formData.personal.gender" 
                  @change="clearError('gender')"
                />
                <span class="custom-radio"></span>
                Male
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="gender" 
                  value="Female" 
                  v-model="formData.personal.gender" 
                  @change="clearError('gender')"
                />
                <span class="custom-radio"></span>
                Female
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="gender" 
                  value="Other" 
                  v-model="formData.personal.gender" 
                  @change="clearError('gender')"
                />
                <span class="custom-radio"></span>
                Other
              </label>
              <label class="radio-label">
                <input 
                  type="radio" 
                  name="gender" 
                  value="Prefer not to say" 
                  v-model="formData.personal.gender" 
                  @change="clearError('gender')"
                />
                <span class="custom-radio"></span>
                Prefer not to say
              </label>
            </div>
            <span v-if="errors.gender" class="error-text">{{ errors.gender }}</span>
          </div>

          <div class="grid-row grid-2">
            <div class="field-group" :class="{ 'has-error': errors.nationality }">
              <label for="nationality">Nationality <span class="req">*</span></label>
              <input 
                id="nationality" 
                type="text" 
                v-model.trim="formData.personal.nationality" 
                placeholder="e.g. American, Mexican, Spanish"
                @input="clearError('nationality')"
              />
              <span v-if="errors.nationality" class="error-text">{{ errors.nationality }}</span>
            </div>

            <div class="field-group" :class="{ 'has-error': errors.nationalId }">
              <label for="nationalId">National ID / Passport No. <span class="req">*</span></label>
              <input 
                id="nationalId" 
                type="text" 
                v-model.trim="formData.personal.nationalId" 
                placeholder="ID or Passport Number"
                @input="clearError('nationalId')"
              />
              <span v-if="errors.nationalId" class="error-text">{{ errors.nationalId }}</span>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Contact Details -->
        <section 
          v-show="viewMode === 'longform' || currentStep === 2" 
          class="form-section-box"
          :class="{ 'step-fade-in': viewMode === 'wizard' }"
        >
          <div class="badge-pill">Contact Details</div>

          <div class="grid-row grid-2">
            <div class="field-group" :class="{ 'has-error': errors.email }">
              <label for="email">Email <span class="req">*</span></label>
              <input 
                id="email" 
                type="email" 
                v-model.trim="formData.contact.email" 
                placeholder="jane.doe@example.com"
                @input="clearError('email')"
              />
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>

            <div class="field-group" :class="{ 'has-error': errors.phone }">
              <label for="phone">Phone <span class="req">*</span></label>
              <input 
                id="phone" 
                type="tel" 
                v-model.trim="formData.contact.phone" 
                placeholder="+1 (555) 000-0000"
                @input="clearError('phone')"
              />
              <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
            </div>
          </div>

          <div class="grid-row grid-2">
            <div class="field-group">
              <label for="altPhone">Alternate Phone <span class="optional">(optional)</span></label>
              <input 
                id="altPhone" 
                type="tel" 
                v-model.trim="formData.contact.altPhone" 
                placeholder="Alternate contact number"
              />
            </div>

            <div class="field-group" :class="{ 'has-error': errors.portfolio }">
              <label for="portfolio">Portfolio / Website <span class="optional">(optional)</span></label>
              <input 
                id="portfolio" 
                type="url" 
                v-model.trim="formData.contact.portfolio" 
                placeholder="https://..."
                @input="clearError('portfolio')"
              />
              <span v-if="errors.portfolio" class="error-text">{{ errors.portfolio }}</span>
            </div>
          </div>

          <div class="field-group" :class="{ 'has-error': errors.address }">
            <label for="address">Address <span class="req">*</span></label>
            <textarea 
              id="address" 
              rows="3" 
              v-model.trim="formData.contact.address" 
              placeholder="Street address, apartment, suite, etc."
              @input="clearError('address')"
            ></textarea>
            <span v-if="errors.address" class="error-text">{{ errors.address }}</span>
          </div>
        </section>

        <!-- SECTION 3: Address Details -->
        <section 
          v-show="viewMode === 'longform' || currentStep === 3" 
          class="form-section-box"
          :class="{ 'step-fade-in': viewMode === 'wizard' }"
        >
          <div class="badge-pill">Address Details</div>

          <div class="grid-row grid-2">
            <div class="field-group" :class="{ 'has-error': errors.city }">
              <label for="city">City <span class="req">*</span></label>
              <input 
                id="city" 
                type="text" 
                v-model.trim="formData.address.city" 
                placeholder="e.g. San Francisco"
                @input="clearError('city')"
              />
              <span v-if="errors.city" class="error-text">{{ errors.city }}</span>
            </div>

            <div class="field-group" :class="{ 'has-error': errors.state }">
              <label for="state">State / Province <span class="req">*</span></label>
              <input 
                id="state" 
                type="text" 
                v-model.trim="formData.address.state" 
                placeholder="e.g. California"
                @input="clearError('state')"
              />
              <span v-if="errors.state" class="error-text">{{ errors.state }}</span>
            </div>
          </div>

          <div class="grid-row grid-2">
            <div class="field-group" :class="{ 'has-error': errors.zipCode }">
              <label for="zipCode">Postal / Zip Code <span class="req">*</span></label>
              <input 
                id="zipCode" 
                type="text" 
                v-model.trim="formData.address.zipCode" 
                placeholder="e.g. 94103"
                @input="clearError('zipCode')"
              />
              <span v-if="errors.zipCode" class="error-text">{{ errors.zipCode }}</span>
            </div>

            <div class="field-group" :class="{ 'has-error': errors.country }">
              <label for="country">Country <span class="req">*</span></label>
              <select 
                id="country" 
                v-model="formData.address.country"
                @change="clearError('country')"
              >
                <option value="" disabled>Select your country</option>
                <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
              </select>
              <span v-if="errors.country" class="error-text">{{ errors.country }}</span>
            </div>
          </div>
        </section>

        <!-- SECTION 4: Professional Profile -->
        <section 
          v-show="viewMode === 'longform' || currentStep === 4" 
          class="form-section-box"
          :class="{ 'step-fade-in': viewMode === 'wizard' }"
        >
          <div class="badge-pill">Professional Profile</div>

          <div class="grid-row grid-2">
            <div class="field-group" :class="{ 'has-error': errors.position }">
              <label for="position">Position Applied For <span class="req">*</span></label>
              <select 
                id="position" 
                v-model="formData.professional.position"
                @change="clearError('position')"
              >
                <option value="" disabled>Select position</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Other">Other</option>
              </select>
              <span v-if="errors.position" class="error-text">{{ errors.position }}</span>
            </div>

            <div class="field-group" :class="{ 'has-error': errors.experience }">
              <label for="experience">Years of Experience <span class="req">*</span></label>
              <select 
                id="experience" 
                v-model="formData.professional.experience"
                @change="clearError('experience')"
              >
                <option value="" disabled>Select experience level</option>
                <option value="Entry Level (0-1 years)">Entry Level (0-1 years)</option>
                <option value="Junior (1-3 years)">Junior (1-3 years)</option>
                <option value="Mid-Level (3-5 years)">Mid-Level (3-5 years)</option>
                <option value="Senior (5+ years)">Senior (5+ years)</option>
                <option value="Lead / Principal (8+ years)">Lead / Principal (8+ years)</option>
              </select>
              <span v-if="errors.experience" class="error-text">{{ errors.experience }}</span>
            </div>
          </div>

          <div class="grid-row grid-2">
            <div class="field-group" :class="{ 'has-error': errors.expectedSalary }">
              <label for="expectedSalary">Expected Salary ($/year or monthly) <span class="req">*</span></label>
              <input 
                id="expectedSalary" 
                type="text" 
                v-model.trim="formData.professional.expectedSalary" 
                placeholder="e.g. $80,000 / year"
                @input="clearError('expectedSalary')"
              />
              <span v-if="errors.expectedSalary" class="error-text">{{ errors.expectedSalary }}</span>
            </div>

            <div class="field-group" :class="{ 'has-error': errors.startDate }">
              <label for="startDate">Available Start Date <span class="req">*</span></label>
              <input 
                id="startDate" 
                type="date" 
                v-model="formData.professional.startDate"
                @input="clearError('startDate')"
              />
              <span v-if="errors.startDate" class="error-text">{{ errors.startDate }}</span>
            </div>
          </div>

          <div class="field-group">
            <label for="coverLetter">Cover Letter / Message to Hiring Team <span class="optional">(optional)</span></label>
            <textarea 
              id="coverLetter" 
              rows="4" 
              v-model.trim="formData.professional.coverLetter"
              placeholder="Introduce yourself and tell us what makes you a great candidate..."
            ></textarea>
          </div>
        </section>

        <!-- SECTION 5: Review & Confirmation (In Wizard mode Step 5) -->
        <section 
          v-if="viewMode === 'wizard' && currentStep === 5" 
          class="form-section-box step-fade-in review-section"
        >
          <div class="badge-pill">Review & Submit</div>
          <p class="review-intro">Please review your information carefully before submitting your application.</p>

          <div class="review-cards">
            <!-- Review Personal Info -->
            <div class="review-card">
              <div class="review-card-header">
                <h3>Personal Information</h3>
                <button type="button" class="btn-text-edit" @click="currentStep = 1">✏️ Edit</button>
              </div>
              <div class="review-grid">
                <div><span>Name:</span> <strong>{{ formData.personal.firstName }} {{ formData.personal.middleName }} {{ formData.personal.lastName }}</strong></div>
                <div><span>Date of Birth:</span> <strong>{{ formData.personal.dob || '—' }}</strong></div>
                <div><span>Gender:</span> <strong>{{ formData.personal.gender || '—' }}</strong></div>
                <div><span>Nationality:</span> <strong>{{ formData.personal.nationality || '—' }}</strong></div>
                <div><span>ID / Passport:</span> <strong>{{ formData.personal.nationalId || '—' }}</strong></div>
              </div>
            </div>

            <!-- Review Contact -->
            <div class="review-card">
              <div class="review-card-header">
                <h3>Contact Details</h3>
                <button type="button" class="btn-text-edit" @click="currentStep = 2">✏️ Edit</button>
              </div>
              <div class="review-grid">
                <div><span>Email:</span> <strong>{{ formData.contact.email || '—' }}</strong></div>
                <div><span>Phone:</span> <strong>{{ formData.contact.phone || '—' }}</strong></div>
                <div v-if="formData.contact.altPhone"><span>Alt. Phone:</span> <strong>{{ formData.contact.altPhone }}</strong></div>
                <div v-if="formData.contact.portfolio"><span>Portfolio:</span> <strong>{{ formData.contact.portfolio }}</strong></div>
                <div class="grid-span-2"><span>Address:</span> <strong>{{ formData.contact.address || '—' }}</strong></div>
              </div>
            </div>

            <!-- Review Address -->
            <div class="review-card">
              <div class="review-card-header">
                <h3>Address Details</h3>
                <button type="button" class="btn-text-edit" @click="currentStep = 3">✏️ Edit</button>
              </div>
              <div class="review-grid">
                <div><span>City:</span> <strong>{{ formData.address.city || '—' }}</strong></div>
                <div><span>State / Province:</span> <strong>{{ formData.address.state || '—' }}</strong></div>
                <div><span>Zip / Postal:</span> <strong>{{ formData.address.zipCode || '—' }}</strong></div>
                <div><span>Country:</span> <strong>{{ formData.address.country || '—' }}</strong></div>
              </div>
            </div>

            <!-- Review Professional -->
            <div class="review-card">
              <div class="review-card-header">
                <h3>Professional Profile</h3>
                <button type="button" class="btn-text-edit" @click="currentStep = 4">✏️ Edit</button>
              </div>
              <div class="review-grid">
                <div><span>Position:</span> <strong>{{ formData.professional.position || '—' }}</strong></div>
                <div><span>Experience:</span> <strong>{{ formData.professional.experience || '—' }}</strong></div>
                <div><span>Expected Salary:</span> <strong>{{ formData.professional.expectedSalary || '—' }}</strong></div>
                <div><span>Start Date:</span> <strong>{{ formData.professional.startDate || '—' }}</strong></div>
                <div v-if="formData.professional.coverLetter" class="grid-span-2">
                  <span>Cover Letter:</span> 
                  <p class="review-quote">{{ formData.professional.coverLetter }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Declarations & Consent -->
          <div class="declaration-box" :class="{ 'has-error': errors.declaration }">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="formData.declaration" 
                @change="clearError('declaration')"
              />
              <span class="custom-checkbox"></span>
              <span>I confirm that all information provided in this application is accurate, complete and truthful.</span>
            </label>
            <span v-if="errors.declaration" class="error-text">{{ errors.declaration }}</span>
          </div>
        </section>

        <!-- Terms Checkbox for Long Form Mode -->
        <div v-if="viewMode === 'longform'" class="declaration-box" :class="{ 'has-error': errors.declaration }">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="formData.declaration" 
              @change="clearError('declaration')"
            />
            <span class="custom-checkbox"></span>
            <span>I confirm that all information provided in this application is accurate, complete and truthful.</span>
          </label>
          <span v-if="errors.declaration" class="error-text">{{ errors.declaration }}</span>
        </div>

        <!-- Form Actions / Navigation Footer -->
        <div class="form-navigation">
          <!-- Wizard mode: Back button -->
          <button 
            v-if="viewMode === 'wizard' && currentStep > 1" 
            type="button" 
            class="btn btn-secondary" 
            :disabled="isSubmitting"
            @click="prevStep"
          >
            ← Back
          </button>
          
          <div class="spacer"></div>

          <!-- Wizard mode: Next button (Steps 1 to 4) -->
          <button 
            v-if="viewMode === 'wizard' && currentStep < steps.length" 
            type="button" 
            class="btn btn-primary" 
            @click="nextStep"
          >
            Next Step →
          </button>

          <!-- Submit button (Step 5 in Wizard, or bottom in Longform) -->
          <button 
            v-if="viewMode === 'longform' || currentStep === steps.length" 
            type="submit" 
            class="btn btn-primary btn-submit"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="spinner"></span>
            <span>{{ isSubmitting ? 'Submitting Application...' : 'Submit Application ✓' }}</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { saveJobApplication } from '../firebase/config'

export default {
  name: 'MultiStepForm',
  data() {
    return {
      viewMode: 'wizard', // 'wizard' or 'longform'
      currentStep: 1,
      isSubmitting: false,
      submittedSuccess: false,
      submissionResult: null,
      submitErrorMessage: '',
      steps: [
        { id: 1, label: 'Personal' },
        { id: 2, label: 'Contact' },
        { id: 3, label: 'Address' },
        { id: 4, label: 'Professional' },
        { id: 5, label: 'Review' }
      ],
      formData: {
        personal: {
          firstName: '',
          lastName: '',
          middleName: '',
          dob: '',
          gender: '',
          nationality: '',
          nationalId: ''
        },
        contact: {
          email: '',
          phone: '',
          altPhone: '',
          portfolio: '',
          address: ''
        },
        address: {
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },
        professional: {
          position: '',
          experience: '',
          expectedSalary: '',
          startDate: '',
          coverLetter: ''
        },
        declaration: false
      },
      errors: {},
      countries: [
        'United States', 'Canada', 'Mexico', 'United Kingdom', 'Spain', 
        'Germany', 'France', 'Australia', 'Argentina', 'Brazil', 
        'Chile', 'Colombia', 'Peru', 'Other'
      ]
    }
  },
  watch: {
    formData: {
      deep: true,
      handler(newVal) {
        // Local storage draft auto-save
        try {
          localStorage.setItem('job_application_draft', JSON.stringify(newVal))
        } catch (e) {
          // ignore localStorage quota errors
        }
      }
    }
  },
  mounted() {
    this.restoreDraft()
  },
  methods: {
    restoreDraft() {
      try {
        const saved = localStorage.getItem('job_application_draft')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed.personal) this.formData.personal = { ...this.formData.personal, ...parsed.personal }
          if (parsed.contact) this.formData.contact = { ...this.formData.contact, ...parsed.contact }
          if (parsed.address) this.formData.address = { ...this.formData.address, ...parsed.address }
          if (parsed.professional) this.formData.professional = { ...this.formData.professional, ...parsed.professional }
          if (typeof parsed.declaration === 'boolean') this.formData.declaration = parsed.declaration
        }
      } catch (e) {
        console.warn('Could not restore draft:', e)
      }
    },
    confirmReset() {
      if (confirm('Are you sure you want to clear your current draft and reset all fields?')) {
        this.resetForm()
      }
    },
    resetForm() {
      localStorage.removeItem('job_application_draft')
      this.formData = {
        personal: {
          firstName: '',
          lastName: '',
          middleName: '',
          dob: '',
          gender: '',
          nationality: '',
          nationalId: ''
        },
        contact: {
          email: '',
          phone: '',
          altPhone: '',
          portfolio: '',
          address: ''
        },
        address: {
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },
        professional: {
          position: '',
          experience: '',
          expectedSalary: '',
          startDate: '',
          coverLetter: ''
        },
        declaration: false
      }
      this.errors = {}
      this.currentStep = 1
      this.submittedSuccess = false
      this.submissionResult = null
      this.submitErrorMessage = ''
    },
    clearError(fieldKey) {
      if (this.errors[fieldKey]) {
        delete this.errors[fieldKey]
      }
      this.submitErrorMessage = ''
    },
    validateStep(stepNumber) {
      const stepErrors = {}

      if (stepNumber === 1) {
        const p = this.formData.personal
        if (!p.firstName) stepErrors.firstName = 'First name is required'
        if (!p.lastName) stepErrors.lastName = 'Last name is required'
        if (!p.dob) {
          stepErrors.dob = 'Date of birth is required'
        } else {
          const birthDate = new Date(p.dob)
          const today = new Date()
          if (birthDate > today) stepErrors.dob = 'Date of birth cannot be in the future'
        }
        if (!p.gender) stepErrors.gender = 'Please select your gender'
        if (!p.nationality) stepErrors.nationality = 'Nationality is required'
        if (!p.nationalId) stepErrors.nationalId = 'National ID or Passport number is required'
      }

      if (stepNumber === 2) {
        const c = this.formData.contact
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!c.email) {
          stepErrors.email = 'Email address is required'
        } else if (!emailRegex.test(c.email)) {
          stepErrors.email = 'Please enter a valid email address'
        }
        if (!c.phone) {
          stepErrors.phone = 'Phone number is required'
        } else if (c.phone.replace(/\D/g, '').length < 7) {
          stepErrors.phone = 'Please enter a valid phone number (at least 7 digits)'
        }
        if (c.portfolio && !c.portfolio.startsWith('http://') && !c.portfolio.startsWith('https://')) {
          stepErrors.portfolio = 'Website must start with http:// or https://'
        }
        if (!c.address) stepErrors.address = 'Address is required'
      }

      if (stepNumber === 3) {
        const a = this.formData.address
        if (!a.city) stepErrors.city = 'City is required'
        if (!a.state) stepErrors.state = 'State / Province is required'
        if (!a.zipCode) stepErrors.zipCode = 'Postal / Zip code is required'
        if (!a.country) stepErrors.country = 'Please select a country'
      }

      if (stepNumber === 4) {
        const prof = this.formData.professional
        if (!prof.position) stepErrors.position = 'Please select the position applied for'
        if (!prof.experience) stepErrors.experience = 'Please select your years of experience'
        if (!prof.expectedSalary) stepErrors.expectedSalary = 'Expected salary is required'
        if (!prof.startDate) stepErrors.startDate = 'Available start date is required'
      }

      if (stepNumber === 5) {
        if (!this.formData.declaration) {
          stepErrors.declaration = 'You must confirm that the information is truthful to proceed'
        }
      }

      this.errors = { ...this.errors, ...stepErrors }
      return Object.keys(stepErrors).length === 0
    },
    validateAll() {
      this.errors = {}
      let isValid = true
      for (let s = 1; s <= 5; s++) {
        if (!this.validateStep(s)) {
          isValid = false
        }
      }
      return isValid
    },
    nextStep() {
      if (this.validateStep(this.currentStep)) {
        if (this.currentStep < this.steps.length) {
          this.currentStep++
          this.scrollToFormTop()
        }
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        this.scrollToFormTop()
      }
    },
    jumpToStep(stepIdx) {
      if (stepIdx < this.currentStep) {
        this.currentStep = stepIdx
        this.scrollToFormTop()
      } else if (stepIdx > this.currentStep) {
        // Validate intermediate steps before jumping forward
        let canJump = true
        for (let s = this.currentStep; s < stepIdx; s++) {
          if (!this.validateStep(s)) {
            canJump = false
            break
          }
        }
        if (canJump) {
          this.currentStep = stepIdx
          this.scrollToFormTop()
        }
      }
    },
    scrollToFormTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async handleFormSubmit() {
      this.submitErrorMessage = ''

      if (this.viewMode === 'wizard') {
        if (!this.validateStep(5)) {
          return
        }
      } else {
        if (!this.validateAll()) {
          this.submitErrorMessage = 'Please correct the highlighted errors before submitting.'
          return
        }
      }

      this.isSubmitting = true

      try {
        const payload = {
          personal: { ...this.formData.personal },
          contact: { ...this.formData.contact },
          address: { ...this.formData.address },
          professional: { ...this.formData.professional },
          declaration: this.formData.declaration,
          createdAt: new Date().toISOString()
        }

        const result = await saveJobApplication(payload)
        this.submissionResult = result
        this.submittedSuccess = true
        localStorage.removeItem('job_application_draft')
        this.scrollToFormTop()
      } catch (err) {
        console.error('Submission failed:', err)
        this.submitErrorMessage = 'An error occurred during submission. Please try again.'
      } finally {
        this.isSubmitting = false
      }
    },
    downloadApplicationJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        id: this.submissionResult?.id,
        submittedAt: new Date().toISOString(),
        ...this.formData
      }, null, 2))
      const downloadAnchor = document.createElement('a')
      downloadAnchor.setAttribute("href", dataStr)
      downloadAnchor.setAttribute("download", `job-application-${this.submissionResult?.id || 'copy'}.json`)
      document.body.appendChild(downloadAnchor)
      downloadAnchor.click()
      downloadAnchor.remove()
    }
  }
}
</script>

<style scoped>
/* Base Form Layout & Aesthetic matching reference screenshot */
.form-wrapper {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 16px 80px;
}

.form-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 36px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0ede6;
}

/* Header */
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3efe8;
}

.header-content {
  flex: 1;
  min-width: 280px;
}

.main-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
}

.main-subtitle {
  font-size: 14px;
  color: #71717a;
  margin: 0;
  line-height: 1.5;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* View Mode Switcher Toggle */
.view-toggle {
  display: inline-flex;
  background: #f4efe6;
  border-radius: 10px;
  padding: 3px;
  border: 1px solid #e7ded0;
}

.toggle-btn {
  background: transparent;
  border: none;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #71717a;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: #ffffff;
  color: #f97316;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.reset-btn {
  background: transparent;
  border: 1px solid #e4e4e7;
  color: #a1a1aa;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}

/* Stepper Component */
.stepper-container {
  position: relative;
  margin-bottom: 34px;
  padding: 0 10px;
}

.stepper-progress-track {
  position: absolute;
  top: 18px;
  left: 40px;
  right: 40px;
  height: 4px;
  background: #e4e4e7;
  z-index: 1;
  border-radius: 4px;
}

.stepper-progress-fill {
  height: 100%;
  background: #f97316;
  border-radius: 4px;
  transition: width 0.35s ease-in-out;
}

.stepper-steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #d4d4d8;
  color: #71717a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.25s ease;
}

.stepper-item.active .step-circle {
  background: #f97316;
  border-color: #f97316;
  color: #ffffff;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
}

.stepper-item.completed .step-circle {
  background: #f97316;
  border-color: #f97316;
  color: #ffffff;
}

.step-label {
  font-size: 13px;
  font-weight: 600;
  color: #71717a;
  transition: color 0.2s;
}

.stepper-item.active .step-label {
  color: #f97316;
  font-weight: 700;
}

.stepper-item.completed .step-label {
  color: #27272a;
}

/* Section Box matching screenshot */
.form-section-box {
  background: #ffffff;
  border: 1px solid #e7ded0;
  border-radius: 14px;
  padding: 26px 26px 20px;
  margin-bottom: 26px;
  position: relative;
  transition: box-shadow 0.2s ease;
}

.form-section-box:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
}

/* Orange Badge Pill matching screenshot */
.badge-pill {
  display: inline-block;
  background-color: #f97316;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 5px 16px;
  border-radius: 9999px;
  margin-bottom: 22px;
  letter-spacing: 0.01em;
}

/* Grid & Fields */
.grid-row {
  display: grid;
  gap: 18px;
  margin-bottom: 18px;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

.grid-row .field-group {
  margin-bottom: 0;
}

label, .group-label {
  font-size: 13.5px;
  font-weight: 600;
  color: #27272a;
}

.req {
  color: #ef4444;
  margin-left: 2px;
}

.optional {
  font-size: 12px;
  font-weight: 400;
  color: #a1a1aa;
}

/* Input, Select, Textarea */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="url"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 11px 14px;
  font-size: 14.5px;
  font-family: inherit;
  color: #18181b;
  background: #ffffff;
  border: 1px solid #d4d4d8;
  border-radius: 8px;
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  color: #a1a1aa;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
}

.has-error input,
.has-error select,
.has-error textarea {
  border-color: #ef4444 !important;
  background-color: #fffaf0;
}

.has-error input:focus,
.has-error select:focus,
.has-error textarea:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
}

.error-text {
  font-size: 12px;
  color: #ef4444;
  font-weight: 500;
  margin-top: 2px;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

/* Custom Radio Buttons */
.radio-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 4px;
}

.radio-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #3f3f46;
  cursor: pointer;
  font-weight: 500;
}

.radio-label input[type="radio"] {
  display: none;
}

.custom-radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #d4d4d8;
  display: inline-block;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.radio-label input[type="radio"]:checked + .custom-radio {
  border-color: #f97316;
}

.radio-label input[type="radio"]:checked + .custom-radio::after {
  content: "";
  position: absolute;
  width: 9px;
  height: 9px;
  background: #f97316;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Custom Checkbox */
.declaration-box {
  background: #faf6f0;
  border: 1px solid #e7ded0;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 26px;
}

.declaration-box.has-error {
  border-color: #ef4444;
  background: #fef2f2;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13.5px;
  color: #3f3f46;
  cursor: pointer;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 2px solid #d4d4d8;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  flex-shrink: 0;
  transition: all 0.2s;
}

.checkbox-label input[type="checkbox"]:checked + .custom-checkbox {
  background: #f97316;
  border-color: #f97316;
}

.checkbox-label input[type="checkbox"]:checked + .custom-checkbox::after {
  content: "✓";
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

/* Review Section */
.review-intro {
  font-size: 14px;
  color: #71717a;
  margin-bottom: 20px;
}

.review-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 22px;
}

.review-card {
  background: #faf8f5;
  border: 1px solid #ebd9c4;
  border-radius: 10px;
  padding: 16px 18px;
}

.review-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px dashed #ebd9c4;
  padding-bottom: 8px;
}

.review-card-header h3 {
  font-size: 15px;
  font-weight: 700;
  color: #18181b;
  margin: 0;
}

.btn-text-edit {
  background: transparent;
  border: none;
  color: #f97316;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-text-edit:hover {
  background: #ffedd5;
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 18px;
  font-size: 13.5px;
}

.review-grid .grid-span-2 {
  grid-column: span 2;
}

.review-grid span {
  color: #71717a;
  margin-right: 6px;
}

.review-grid strong {
  color: #18181b;
}

.review-quote {
  margin: 6px 0 0;
  padding: 8px 12px;
  background: #ffffff;
  border-left: 3px solid #f97316;
  border-radius: 4px;
  font-style: italic;
  color: #3f3f46;
}

/* Buttons & Navigation */
.form-navigation {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.spacer {
  flex: 1;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #f97316;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
}

.btn-primary:hover:not(:disabled) {
  background: #ea580c;
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.35);
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f4efe6;
  color: #4b5563;
  border: 1px solid #e7ded0;
}

.btn-secondary:hover:not(:disabled) {
  background: #eae2d5;
  color: #1f2937;
}

.btn-submit {
  min-width: 200px;
  padding: 14px 28px;
  font-size: 16px;
}

/* Alert Error */
.alert-box {
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}

.alert-error {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
}

/* Success View */
.success-card {
  text-align: center;
  padding: 50px 36px;
}

.success-icon-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #dcfce7;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.success-icon {
  width: 38px;
  height: 38px;
}

.success-title {
  font-size: 26px;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 8px;
}

.success-subtitle {
  font-size: 15px;
  color: #71717a;
  margin: 0 0 28px;
}

.submission-details {
  max-width: 480px;
  margin: 0 auto 24px;
  background: #faf8f5;
  border: 1px solid #ebd9c4;
  border-radius: 12px;
  padding: 16px 20px;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed #ebd9c4;
  font-size: 14px;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  color: #71717a;
  font-weight: 500;
}

.detail-value {
  color: #18181b;
  font-weight: 600;
}

.detail-value.highlight {
  font-family: monospace;
  font-size: 15px;
  color: #ea580c;
  background: #fff7ed;
  padding: 2px 8px;
  border-radius: 4px;
}

.detail-badge {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 9999px;
}

.badge-firestore {
  background: #dbeafe;
  color: #1e40af;
}

.badge-local {
  background: #fef3c7;
  color: #92400e;
}

.storage-notice {
  font-size: 13px;
  color: #b45309;
  max-width: 480px;
  margin: 0 auto 24px;
  line-height: 1.4;
}

.success-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

/* Spinner Animation */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Step transition fade */
.step-fade-in {
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsiveness */
@media (max-width: 680px) {
  .form-card {
    padding: 24px 18px;
    border-radius: 16px;
  }

  .grid-2,
  .review-grid {
    grid-template-columns: 1fr;
  }

  .review-grid .grid-span-2 {
    grid-column: span 1;
  }

  .stepper-progress-track {
    left: 20px;
    right: 20px;
  }

  .step-label {
    display: none;
  }

  .header-controls {
    width: 100%;
    justify-content: space-between;
  }

  .view-toggle {
    width: 100%;
  }

  .toggle-btn {
    flex: 1;
    text-align: center;
  }

  .form-navigation {
    flex-direction: column-reverse;
    gap: 12px;
  }

  .btn {
    width: 100%;
  }
}
</style>
