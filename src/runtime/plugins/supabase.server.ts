// import { useCookie } from 'h3'
import { defineNuxtPlugin } from '#app'
import { useSupabaseUser } from '../composables/useSupabaseUser'
import { useSupabaseClient } from '../composables/useSupabaseClient'
import { useSupabaseToken } from '../composables/useSupabaseToken'

// Set subabase user on server side
export default defineNuxtPlugin(async () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const token = useSupabaseToken()

  if (!token.value) {
    return
  }

  const { user: supabaseUser, error } = await client.auth.api.getUser(token.value)

  user.value = error ? null : supabaseUser
})
