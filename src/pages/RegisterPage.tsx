import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Seo } from '../lib/seo'
import { brand } from '../config/brand'
import { divisions, fightingStyles } from '../config/site'
import { registrationService } from '../services/registrationService'
import type { RegistrationInput } from '../types'
import { Button, LinkButton } from '../components/ui/Button'
import { Container } from '../components/ui/Layout'
import { FormField, inputClass, selectClass } from '../components/ui/FormField'
import { Stepper } from '../components/ui/Stepper'
import s from './RegisterPage.module.css'

type Key = keyof RegistrationInput
type Errors = Partial<Record<Key, string>>

const MAX_IMAGE_MB = 5

const empty: RegistrationInput = {
  characterName: '', nickname: '', discord: '', age: '', nationality: '', divisionId: '', height: '',
  fightingStyle: '', team: '', experience: '', bio: '', profileImage: null, socialLinks: '', notes: '', agreeRules: false,
}

/** Per-step validation. Returns field → message for everything that fails. */
const validators: ((v: RegistrationInput) => Errors)[] = [
  (v) => ({
    ...(v.characterName.trim().length < 3 && { characterName: 'Enter your character’s full name (at least 3 characters).' }),
    ...(!/^\d+$/.test(v.age) || +v.age < 18 || +v.age > 70 ? { age: 'Fighters must be between 18 and 70.' } : {}),
    ...(!v.nationality.trim() && { nationality: 'Enter a nationality.' }),
    ...(!v.divisionId && { divisionId: 'Choose a weight class.' }),
  }),
  (v) => ({
    ...(!/^[a-z0-9_.]{2,32}$/.test(v.discord.trim()) && { discord: 'Use your Discord username: 2–32 lowercase letters, numbers, dots or underscores.' }),
    ...(!v.fightingStyle && { fightingStyle: 'Choose a fighting style.' }),
  }),
  (v) => ({
    ...(v.experience.trim().length < 20 && { experience: 'Tell us a bit more (at least 20 characters).' }),
    ...(v.bio.trim().length < 40 && { bio: 'Write at least 40 characters so we can introduce you.' }),
    ...(v.profileImage && v.profileImage.size > MAX_IMAGE_MB * 1024 * 1024 && { profileImage: `Image must be under ${MAX_IMAGE_MB} MB.` }),
  }),
  (v) => ({
    ...(!v.agreeRules && { agreeRules: 'You need to accept the rules to register.' }),
  }),
]

const steps = ['Fighter', 'Background', 'Experience', 'Submit']

type Status = { state: 'idle' } | { state: 'submitting' } | { state: 'error'; message: string } | { state: 'done'; reference: string }

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)
  /** Set when changing step, so the new step heading takes focus once it mounts. */
  const focusHeading = useRef(false)
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    if (!values.profileImage) return setPreview(undefined)
    const url = URL.createObjectURL(values.profileImage)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [values.profileImage])

  const set = <K extends Key>(key: K, value: RegistrationInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  /** Text-like field props. */
  const bind = (key: Exclude<Key, 'profileImage' | 'agreeRules'>) => ({
    name: key,
    value: values[key],
    onChange: (e: { target: { value: string } }) => set(key, e.target.value),
  })

  function validate(): boolean {
    const found = validators[step](values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return false
    }
    return true
  }

  function go(to: number) {
    setStep(to)
    setErrors({})
    focusHeading.current = true
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    if (step < steps.length - 1) return go(step + 1)
    setStatus({ state: 'submitting' })
    try {
      const { reference } = await registrationService.submit(values)
      setStatus({ state: 'done', reference })
      window.scrollTo({ top: 0 })
    } catch (err) {
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
    }
  }

  if (status.state === 'done') {
    return (
      <Container className={s.page}>
        <Seo title="Registration received" />
        <motion.div className={s.success} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status">
          <span className={s.successIcon} aria-hidden><Check size={32} /></span>
          <p className="label">Reference {status.reference}</p>
          <h1 className={s.title}>You’re on the list</h1>
          <p className={s.lead}>
            Thanks, {values.characterName.split(' ')[0]}. Matchmaking reviews every application. We’ll reach out to <strong>{values.discord}</strong> on Discord with next steps, usually within a week.
          </p>
          <div className={s.successActions}>
            <LinkButton to="/events">See upcoming events</LinkButton>
            {brand.social.discord && (
              <a className={s.textLink} href={brand.social.discord} target="_blank" rel="noreferrer">Join the Discord</a>
            )}
          </div>
        </motion.div>
      </Container>
    )
  }

  const division = divisions.find((d) => d.id === values.divisionId)
  const summary: [string, string][] = [
    ['Character', values.characterName],
    ['Nickname', values.nickname || '—'],
    ['Age', values.age],
    ['Nationality', values.nationality],
    ['Weight class', division ? `${division.name} (${division.limit})` : '—'],
    ['Height', values.height || '—'],
    ['Discord', values.discord],
    ['Style', values.fightingStyle],
    ['Team', values.team || '—'],
    ['Photo', values.profileImage?.name ?? '—'],
  ]

  return (
    <div className={s.layout}>
      <Seo title="Register" description="Register your fighter and join the CMRP Combat roster." />

      <aside className={s.intro}>
        <p className="label">Fighter registration</p>
        <h1 className={s.title}>Step into<br /> the cage</h1>
        <p className={s.lead}>Think you have what it takes? Register your fighter and enter the {brand.organization} roster.</p>
        <ul className={s.points}>
          <li><strong>In character.</strong> Register your RP character, not yourself.</li>
          <li><strong>All levels.</strong> Debuts go on the prelims; win and you move up.</li>
          <li><strong>Reviewed by matchmaking.</strong> We contact you on Discord.</li>
        </ul>
      </aside>

      <div className={s.formWrap}>
        <Stepper steps={steps} current={step} />

        <form ref={formRef} onSubmit={onSubmit} noValidate className={s.form} aria-labelledby="step-title">
          <motion.fieldset
            key={step}
            className={s.fieldset}
            initial={step === 0 ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <legend className="sr-only">{steps[step]}</legend>
            <h2 id="step-title" ref={(el) => { if (el && focusHeading.current) { focusHeading.current = false; el.focus() } }} tabIndex={-1} className={s.stepTitle}>
              <span className={s.stepNum}>{String(step + 1).padStart(2, '0')}</span> {steps[step]}
            </h2>

            {step === 0 && (
              <div className={s.grid}>
                <FormField label="Character name" required error={errors.characterName} className={s.full}>
                  {(p) => <input {...p} {...bind('characterName')} className={inputClass} autoComplete="off" placeholder="e.g. Marcus Vega" />}
                </FormField>
                <FormField label="Nickname" hint="Your fight name, without quotes." error={errors.nickname}>
                  {(p) => <input {...p} {...bind('nickname')} className={inputClass} autoComplete="off" placeholder="e.g. The Wolf" />}
                </FormField>
                <FormField label="Age" required error={errors.age}>
                  {(p) => <input {...p} {...bind('age')} className={inputClass} inputMode="numeric" />}
                </FormField>
                <FormField label="Nationality" required error={errors.nationality}>
                  {(p) => <input {...p} {...bind('nationality')} className={inputClass} />}
                </FormField>
                <FormField label="Height" hint={'e.g. 5\'11" or 180 cm'} error={errors.height}>
                  {(p) => <input {...p} {...bind('height')} className={inputClass} />}
                </FormField>
                <FormField label="Weight class" required error={errors.divisionId} className={s.full}>
                  {(p) => (
                    <select {...p} {...bind('divisionId')} className={selectClass}>
                      <option value="">Select a division</option>
                      {divisions.map((d) => <option key={d.id} value={d.id}>{d.name} · {d.limit}</option>)}
                    </select>
                  )}
                </FormField>
              </div>
            )}

            {step === 1 && (
              <div className={s.grid}>
                <FormField label="Discord username" required hint="So matchmaking can contact you." error={errors.discord}>
                  {(p) => <input {...p} {...bind('discord')} className={inputClass} autoComplete="off" autoCapitalize="none" spellCheck={false} />}
                </FormField>
                <FormField label="Fighting style" required error={errors.fightingStyle}>
                  {(p) => (
                    <select {...p} {...bind('fightingStyle')} className={selectClass}>
                      <option value="">Select a style</option>
                      {fightingStyles.map((st) => <option key={st}>{st}</option>)}
                    </select>
                  )}
                </FormField>
                <FormField label="Team / gym" error={errors.team}>
                  {(p) => <input {...p} {...bind('team')} className={inputClass} />}
                </FormField>
                <FormField label="Social links" hint="Clips or socials for your character. One per line." error={errors.socialLinks}>
                  {(p) => <textarea {...p} {...bind('socialLinks')} className={inputClass} rows={3} />}
                </FormField>
              </div>
            )}

            {step === 2 && (
              <div className={s.grid}>
                <FormField label="Previous experience" required hint="Fights in the city, training, record so far." error={errors.experience} className={s.full}>
                  {(p) => <textarea {...p} {...bind('experience')} className={inputClass} rows={4} />}
                </FormField>
                <FormField label="Short biography" required hint="How the commentators should introduce you." error={errors.bio} className={s.full}>
                  {(p) => <textarea {...p} {...bind('bio')} className={inputClass} rows={4} />}
                </FormField>
                <FormField label="Profile image" hint={`PNG or JPG, under ${MAX_IMAGE_MB} MB. A cut-out with a plain background works best.`} error={errors.profileImage}>
                  {(p) => (
                    <div className={s.upload}>
                      <input {...p} name="profileImage" type="file" accept="image/png,image/jpeg,image/webp" className={s.file}
                        onChange={(e) => set('profileImage', e.target.files?.[0] ?? null)} />
                      {preview && <img src={preview} alt="Selected profile image preview" className={s.preview} />}
                    </div>
                  )}
                </FormField>
                <FormField label="Additional notes" error={errors.notes}>
                  {(p) => <textarea {...p} {...bind('notes')} className={inputClass} rows={4} />}
                </FormField>
              </div>
            )}

            {step === 3 && (
              <div className={s.review}>
                <dl className={s.summary}>
                  {summary.map(([k, v]) => (
                    <div key={k}><dt className="label">{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>
                <FormField label="Rules" required error={errors.agreeRules}>
                  {(p) => (
                    <label className={s.check}>
                      <input {...p} name="agreeRules" type="checkbox" checked={values.agreeRules} onChange={(e) => set('agreeRules', e.target.checked)} />
                      <span>I accept the {brand.organization} rules and understand that fights happen in character on the {brand.name} server.</span>
                    </label>
                  )}
                </FormField>
                {status.state === 'error' && <p className={s.submitError} role="alert">{status.message}</p>}
              </div>
            )}
          </motion.fieldset>

          <div className={s.nav}>
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={() => go(step - 1)}>
                <ArrowLeft aria-hidden /> Back
              </Button>
            ) : <span />}
            <Button type="submit" size="lg" disabled={status.state === 'submitting'} aria-busy={status.state === 'submitting'}>
              {step < steps.length - 1 ? <>Continue <ArrowRight aria-hidden /></> : status.state === 'submitting' ? 'Submitting…' : 'Submit registration'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
