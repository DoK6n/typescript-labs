import { Provider } from '@nestjs/common'
import { ClassProvider, InjectionToken } from '@nestjs/common'

export const useClass = <T>(
  token: InjectionToken,
  implementation: ClassProvider<T>['useClass'],
): Provider => {
  return {
    provide: token,
    useClass: implementation,
  }
}

export const useFactory = (
  provide: any,
  Repository: new (...args: any[]) => any,
  inject: any[],
) => ({
  provide,
  useFactory: (...args: any[]) => new Repository(...args),
  inject,
})
