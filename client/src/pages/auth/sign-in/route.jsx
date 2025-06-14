import { parseWithZod } from '@conform-to/zod'
// import { setTimeout } from 'node:timers/promises'
import { redirectWithSuccess } from 'remix-toast'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'

export const formSchema = z.object({
  email: z
    .string({ required_error: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z.string({ required_error: 'Please enter your password' }).min(7, {
    message: 'Password must be at least 7 characters long',
  }),
})

export const action = async ({ request }) => {
  const submission = parseWithZod(await request.formData(), {
    schema: formSchema,
  })

  if (submission.status !== 'success') {
    return { lastResult: submission.reply() }
  }

  if (submission.value.email !== 'name@example.com') {
    return {
      lastResult: submission.reply({
        formErrors: ['Invalid email or password'],
      }),
    }
  }
  // await setTimeout(1000)

  throw await redirectWithSuccess('/', {
    message: 'You have successfully logged in!',
  })
}

export default function SignIn() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password below <br />
          to log into your account
        </p>
      </div>
      <UserAuthForm />
      <p className="text-muted-foreground mt-4 px-8 text-center text-sm">
        By clicking login, you agree to our{' '}
        <a
          href="/terms"
          className="hover:text-primary underline underline-offset-4"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="/privacy"
          className="hover:text-primary underline underline-offset-4"
        >
          Privacy Policy
        </a>
        .
      </p>
    </Card>
  )
}
