// proxy to official api
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return $fetch(
    `https://xlog-anonymous.xlog.app/api/anonymous/comment`,
    { method: 'POST', body },
  )
})
