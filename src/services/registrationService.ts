import type { RegistrationInput } from '../types'

export type SubmitResult = { reference: string }

export interface RegistrationService {
  submit(input: RegistrationInput): Promise<SubmitResult>
}

/** Posts multipart form data to VITE_REGISTRATION_ENDPOINT. Expects `{ reference }` JSON back. */
const httpService = (endpoint: string): RegistrationService => ({
  async submit(input) {
    const body = new FormData()
    for (const [key, value] of Object.entries(input)) {
      if (value instanceof File) body.append(key, value)
      else if (value != null) body.append(key, String(value))
    }
    const res = await fetch(endpoint, { method: 'POST', body })
    if (!res.ok) throw new Error(`Submission failed (${res.status}). Please try again.`)
    return res.json()
  },
})

/** Development only: nothing is stored. */
const mockService: RegistrationService = {
  async submit(input) {
    await new Promise((r) => setTimeout(r, 900))
    console.info('[registrationService:mock] would submit', input)
    return { reference: 'DEV-' + Math.random().toString(36).slice(2, 8).toUpperCase() }
  },
}

/** Production build with no endpoint configured: fail loudly instead of pretending. */
const unavailableService: RegistrationService = {
  async submit() {
    throw new Error('Online registration is not open yet. Apply through our Discord in the meantime.')
  },
}

const endpoint = import.meta.env.VITE_REGISTRATION_ENDPOINT as string | undefined

export const registrationService: RegistrationService = endpoint
  ? httpService(endpoint)
  : import.meta.env.DEV
    ? mockService
    : unavailableService
