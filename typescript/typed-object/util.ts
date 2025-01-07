export const noop = () => {}

export const encodeURIData = <T>(data: T) => {
  return encodeURIComponent(JSON.stringify(data))
}

export const decodeURIData = <T>(encodedData: string) => {
  return JSON.parse(decodeURIComponent(encodedData)) as T
}

export const maybe = <T>(value: T) => value || null
export const perhaps = <T>(value: T) => value || undefined

// zustand subscribe executor
export const createSubscribeExecutor =
  <T>(store: T) =>
  (subscribes: ((store: T) => void)[]) => {
    subscribes.forEach(subscribe => subscribe(store))
  }

// next pages redirect util like app router redirect
/**
 * @example
 * export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
 *   const session = await checkIsLoggedIn(context)
 *   if (!session) return redirect('/')
 *   return {
 *     props: {
 *       params: { id: context.params?.id },
 *       fallback: {},
 *     },
 *   }
 * }) satisfies GetServerSideProps
 *
 * export default function OrderDetailInfoPage({
 *   params,
 *   fallback,
 * }: InferGetServerSidePropsType<typeof getServerSideProps>) {
 *   return <div>OrderDetailInfoPage</div>
 * }
 */
export const redirect = (destination: string, permanent = false) => {
  return {
    redirect: {
      destination,
      permanent,
    },
  }
}

export const mapToArray = <V>(map: Map<string, V>) => Array.from(map.values())
