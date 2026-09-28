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
    ...(v.characterName.trim().length < 3 && { characterName: 'Zadej celé jméno postavy (alespoň 3 znaky).' }),
    ...(!/^\d+$/.test(v.age) || +v.age < 18 || +v.age > 70 ? { age: 'Zápasníkovi musí být 18 až 70 let.' } : {}),
    ...(!v.nationality.trim() && { nationality: 'Zadej národnost.' }),
    ...(!v.divisionId && { divisionId: 'Vyber váhovou kategorii.' }),
  }),
  (v) => ({
    ...(!/^[a-z0-9_.]{2,32}$/.test(v.discord.trim()) && { discord: 'Zadej Discord uživatelské jméno: 2–32 malých písmen, číslic, teček nebo podtržítek.' }),
    ...(!v.fightingStyle && { fightingStyle: 'Vyber bojový styl.' }),
  }),
  (v) => ({
    ...(v.experience.trim().length < 20 && { experience: 'Napiš toho trochu víc (alespoň 20 znaků).' }),
    ...(v.bio.trim().length < 40 && { bio: 'Napiš alespoň 40 znaků, ať tě můžeme představit.' }),
    ...(v.profileImage && v.profileImage.size > MAX_IMAGE_MB * 1024 * 1024 && { profileImage: `Obrázek musí mít méně než ${MAX_IMAGE_MB} MB.` }),
  }),
  (v) => ({
    ...(!v.agreeRules && { agreeRules: 'Pro registraci musíš přijmout pravidla.' }),
  }),
]

const steps = ['Zápasník', 'Zázemí', 'Zkušenosti', 'Odeslat']

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
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'Něco se pokazilo. Zkus to prosím znovu.' })
    }
  }

  if (status.state === 'done') {
    return (
      <Container className={s.page}>
        <Seo title="Registrace přijata" />
        <motion.div className={s.success} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} role="status">
          <span className={s.successIcon} aria-hidden><Check size={32} /></span>
          <p className="label">Číslo přihlášky {status.reference}</p>
          <h1 className={s.title}>Jsi na seznamu</h1>
          <p className={s.lead}>
            Díky, {values.characterName.split(' ')[0]}. Matchmaking projde každou přihlášku. Ozveme se ti na Discordu (<strong>{values.discord}</strong>) s dalším postupem, obvykle do týdne.
          </p>
          <div className={s.successActions}>
            <LinkButton to="/events">Nadcházející akce</LinkButton>
            {brand.social.discord && (
              <a className={s.textLink} href={brand.social.discord} target="_blank" rel="noreferrer">Připoj se na Discord</a>
            )}
          </div>
        </motion.div>
      </Container>
    )
  }

  const division = divisions.find((d) => d.id === values.divisionId)
  const summary: [string, string][] = [
    ['Postava', values.characterName],
    ['Přezdívka', values.nickname || '—'],
    ['Věk', values.age],
    ['Národnost', values.nationality],
    ['Váhová kategorie', division ? `${division.name} (${division.limit})` : '—'],
    ['Výška', values.height || '—'],
    ['Discord', values.discord],
    ['Styl', values.fightingStyle],
    ['Tým', values.team || '—'],
    ['Fotka', values.profileImage?.name ?? '—'],
  ]

  return (
    <div className={s.layout}>
      <Seo title="Registrace" description="Zaregistruj svého zápasníka a dostaň se na soupisku CMRP Combat." />

      <aside className={s.intro}>
        <p className="label">Registrace zápasníka</p>
        <h1 className={s.title}>Vstup<br /> do klece</h1>
        <p className={s.lead}>Myslíš, že na to máš? Zaregistruj svého zápasníka a dostaň se na soupisku {brand.organization}.</p>
        <ul className={s.points}>
          <li><strong>V roli.</strong> Registruješ svou RP postavu, ne sebe.</li>
          <li><strong>Všechny úrovně.</strong> Nováčci začínají na předkartě. Vyhraj a posuneš se výš.</li>
          <li><strong>Schvaluje matchmaking.</strong> Ozveme se ti na Discordu.</li>
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
                <FormField label="Jméno postavy" required error={errors.characterName} className={s.full}>
                  {(p) => <input {...p} {...bind('characterName')} className={inputClass} autoComplete="off" placeholder="např. Marcus Vega" />}
                </FormField>
                <FormField label="Přezdívka" hint="Tvoje bojové jméno, bez uvozovek." error={errors.nickname}>
                  {(p) => <input {...p} {...bind('nickname')} className={inputClass} autoComplete="off" placeholder="např. The Wolf" />}
                </FormField>
                <FormField label="Věk" required error={errors.age}>
                  {(p) => <input {...p} {...bind('age')} className={inputClass} inputMode="numeric" />}
                </FormField>
                <FormField label="Národnost" required error={errors.nationality}>
                  {(p) => <input {...p} {...bind('nationality')} className={inputClass} />}
                </FormField>
                <FormField label="Výška" hint="např. 180 cm" error={errors.height}>
                  {(p) => <input {...p} {...bind('height')} className={inputClass} />}
                </FormField>
                <FormField label="Váhová kategorie" required error={errors.divisionId} className={s.full}>
                  {(p) => (
                    <select {...p} {...bind('divisionId')} className={selectClass}>
                      <option value="">Vyber kategorii</option>
                      {divisions.map((d) => <option key={d.id} value={d.id}>{d.name} · {d.limit}</option>)}
                    </select>
                  )}
                </FormField>
              </div>
            )}

            {step === 1 && (
              <div className={s.grid}>
                <FormField label="Discord uživatelské jméno" required hint="Aby tě mohl kontaktovat matchmaking." error={errors.discord}>
                  {(p) => <input {...p} {...bind('discord')} className={inputClass} autoComplete="off" autoCapitalize="none" spellCheck={false} />}
                </FormField>
                <FormField label="Bojový styl" required error={errors.fightingStyle}>
                  {(p) => (
                    <select {...p} {...bind('fightingStyle')} className={selectClass}>
                      <option value="">Vyber styl</option>
                      {fightingStyles.map((st) => <option key={st}>{st}</option>)}
                    </select>
                  )}
                </FormField>
                <FormField label="Tým / gym" error={errors.team}>
                  {(p) => <input {...p} {...bind('team')} className={inputClass} />}
                </FormField>
                <FormField label="Odkazy na sociální sítě" hint="Klipy nebo sítě tvé postavy. Jeden odkaz na řádek." error={errors.socialLinks}>
                  {(p) => <textarea {...p} {...bind('socialLinks')} className={inputClass} rows={3} />}
                </FormField>
              </div>
            )}

            {step === 2 && (
              <div className={s.grid}>
                <FormField label="Předchozí zkušenosti" required hint="Zápasy ve městě, trénink, dosavadní bilance." error={errors.experience} className={s.full}>
                  {(p) => <textarea {...p} {...bind('experience')} className={inputClass} rows={4} />}
                </FormField>
                <FormField label="Krátký životopis" required hint="Jak tě mají představit komentátoři." error={errors.bio} className={s.full}>
                  {(p) => <textarea {...p} {...bind('bio')} className={inputClass} rows={4} />}
                </FormField>
                <FormField label="Profilová fotka" hint={`PNG nebo JPG, do ${MAX_IMAGE_MB} MB. Nejlépe vypadá výřez s čistým pozadím.`} error={errors.profileImage}>
                  {(p) => (
                    <div className={s.upload}>
                      <input {...p} name="profileImage" type="file" accept="image/png,image/jpeg,image/webp" className={s.file}
                        onChange={(e) => set('profileImage', e.target.files?.[0] ?? null)} />
                      {preview && <img src={preview} alt="Náhled vybrané profilové fotky" className={s.preview} />}
                    </div>
                  )}
                </FormField>
                <FormField label="Další poznámky" error={errors.notes}>
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
                <FormField label="Pravidla" required error={errors.agreeRules}>
                  {(p) => (
                    <label className={s.check}>
                      <input {...p} name="agreeRules" type="checkbox" checked={values.agreeRules} onChange={(e) => set('agreeRules', e.target.checked)} />
                      <span>Přijímám pravidla {brand.organization} a beru na vědomí, že zápasy probíhají v roli na serveru {brand.name}.</span>
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
                <ArrowLeft aria-hidden /> Zpět
              </Button>
            ) : <span />}
            <Button type="submit" size="lg" disabled={status.state === 'submitting'} aria-busy={status.state === 'submitting'}>
              {step < steps.length - 1 ? <>Pokračovat <ArrowRight aria-hidden /></> : status.state === 'submitting' ? 'Odesílám…' : 'Odeslat registraci'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
