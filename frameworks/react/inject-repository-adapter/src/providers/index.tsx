import { InjectableProvider } from './injectable.provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <InjectableProvider>{children}</InjectableProvider>
}
