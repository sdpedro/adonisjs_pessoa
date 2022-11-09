import { test } from '@japa/runner'

test('display welcome page', async ({ client }) => {
  const response = await client.get('/api/test')
  response.assertStatus(404)
  response.assertBodyContains({ error: 'Page not found' })
})
