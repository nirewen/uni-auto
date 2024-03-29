/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedImport } from './routes/_protected'
import { Route as IndexImport } from './routes/index'
import { Route as AuthIndexImport } from './routes/auth/index'
import { Route as ProtectedConnectionsImport } from './routes/_protected/connections'
import { Route as ProtectedAdminImport } from './routes/_protected/admin'
import { Route as AuthLoginIndexImport } from './routes/auth/login/index'
import { Route as AuthCallbackIndexImport } from './routes/auth/callback/index'
import { Route as ProtectedProfileIndexImport } from './routes/_protected/profile/index'
import { Route as ProtectedConnectionsIndexImport } from './routes/_protected/connections/index'
import { Route as ProtectedAdminIndexImport } from './routes/_protected/admin/index'
import { Route as ProtectedConnectionsConnectionIdImport } from './routes/_protected/connections/$connectionId'
import { Route as ProtectedAdminUsersImport } from './routes/_protected/admin/users'
import { Route as ProtectedAdminQueueImport } from './routes/_protected/admin/queue'
import { Route as ProtectedAdminModulesImport } from './routes/_protected/admin/modules'
import { Route as ProtectedAdminInvitesImport } from './routes/_protected/admin/invites'
import { Route as ProtectedAdminConnectionsImport } from './routes/_protected/admin/connections'
import { Route as ProtectedConnectionsConnectionIdIndexImport } from './routes/_protected/connections/$connectionId/index'
import { Route as ProtectedConnectionsConnectionIdModuleSlugImport } from './routes/_protected/connections/$connectionId/$moduleSlug'
import { Route as ProtectedConnectionsNewUfsmIndexImport } from './routes/_protected/connections/new/ufsm/index'
import { Route as ProtectedConnectionsConnectionIdModuleSlugIndexImport } from './routes/_protected/connections/$connectionId/$moduleSlug/index'

// Create/Update Routes

const ProtectedRoute = ProtectedImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  path: '/auth/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedConnectionsRoute = ProtectedConnectionsImport.update({
  path: '/connections',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedAdminRoute = ProtectedAdminImport.update({
  path: '/admin',
  getParentRoute: () => ProtectedRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  path: '/auth/login/',
  getParentRoute: () => rootRoute,
} as any)

const AuthCallbackIndexRoute = AuthCallbackIndexImport.update({
  path: '/auth/callback/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedProfileIndexRoute = ProtectedProfileIndexImport.update({
  path: '/profile/',
  getParentRoute: () => ProtectedRoute,
} as any)

const ProtectedConnectionsIndexRoute = ProtectedConnectionsIndexImport.update({
  path: '/',
  getParentRoute: () => ProtectedConnectionsRoute,
} as any)

const ProtectedAdminIndexRoute = ProtectedAdminIndexImport.update({
  path: '/',
  getParentRoute: () => ProtectedAdminRoute,
} as any)

const ProtectedConnectionsConnectionIdRoute =
  ProtectedConnectionsConnectionIdImport.update({
    path: '/$connectionId',
    getParentRoute: () => ProtectedConnectionsRoute,
  } as any)

const ProtectedAdminUsersRoute = ProtectedAdminUsersImport.update({
  path: '/users',
  getParentRoute: () => ProtectedAdminRoute,
} as any)

const ProtectedAdminQueueRoute = ProtectedAdminQueueImport.update({
  path: '/queue',
  getParentRoute: () => ProtectedAdminRoute,
} as any)

const ProtectedAdminModulesRoute = ProtectedAdminModulesImport.update({
  path: '/modules',
  getParentRoute: () => ProtectedAdminRoute,
} as any)

const ProtectedAdminInvitesRoute = ProtectedAdminInvitesImport.update({
  path: '/invites',
  getParentRoute: () => ProtectedAdminRoute,
} as any)

const ProtectedAdminConnectionsRoute = ProtectedAdminConnectionsImport.update({
  path: '/connections',
  getParentRoute: () => ProtectedAdminRoute,
} as any)

const ProtectedConnectionsConnectionIdIndexRoute =
  ProtectedConnectionsConnectionIdIndexImport.update({
    path: '/',
    getParentRoute: () => ProtectedConnectionsConnectionIdRoute,
  } as any)

const ProtectedConnectionsConnectionIdModuleSlugRoute =
  ProtectedConnectionsConnectionIdModuleSlugImport.update({
    path: '/$moduleSlug',
    getParentRoute: () => ProtectedConnectionsConnectionIdRoute,
  } as any)

const ProtectedConnectionsNewUfsmIndexRoute =
  ProtectedConnectionsNewUfsmIndexImport.update({
    path: '/new/ufsm/',
    getParentRoute: () => ProtectedConnectionsRoute,
  } as any)

const ProtectedConnectionsConnectionIdModuleSlugIndexRoute =
  ProtectedConnectionsConnectionIdModuleSlugIndexImport.update({
    path: '/',
    getParentRoute: () => ProtectedConnectionsConnectionIdModuleSlugRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      preLoaderRoute: typeof ProtectedImport
      parentRoute: typeof rootRoute
    }
    '/_protected/admin': {
      preLoaderRoute: typeof ProtectedAdminImport
      parentRoute: typeof ProtectedImport
    }
    '/_protected/connections': {
      preLoaderRoute: typeof ProtectedConnectionsImport
      parentRoute: typeof ProtectedImport
    }
    '/auth/': {
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof rootRoute
    }
    '/_protected/admin/connections': {
      preLoaderRoute: typeof ProtectedAdminConnectionsImport
      parentRoute: typeof ProtectedAdminImport
    }
    '/_protected/admin/invites': {
      preLoaderRoute: typeof ProtectedAdminInvitesImport
      parentRoute: typeof ProtectedAdminImport
    }
    '/_protected/admin/modules': {
      preLoaderRoute: typeof ProtectedAdminModulesImport
      parentRoute: typeof ProtectedAdminImport
    }
    '/_protected/admin/queue': {
      preLoaderRoute: typeof ProtectedAdminQueueImport
      parentRoute: typeof ProtectedAdminImport
    }
    '/_protected/admin/users': {
      preLoaderRoute: typeof ProtectedAdminUsersImport
      parentRoute: typeof ProtectedAdminImport
    }
    '/_protected/connections/$connectionId': {
      preLoaderRoute: typeof ProtectedConnectionsConnectionIdImport
      parentRoute: typeof ProtectedConnectionsImport
    }
    '/_protected/admin/': {
      preLoaderRoute: typeof ProtectedAdminIndexImport
      parentRoute: typeof ProtectedAdminImport
    }
    '/_protected/connections/': {
      preLoaderRoute: typeof ProtectedConnectionsIndexImport
      parentRoute: typeof ProtectedConnectionsImport
    }
    '/_protected/profile/': {
      preLoaderRoute: typeof ProtectedProfileIndexImport
      parentRoute: typeof ProtectedImport
    }
    '/auth/callback/': {
      preLoaderRoute: typeof AuthCallbackIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/login/': {
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/_protected/connections/$connectionId/$moduleSlug': {
      preLoaderRoute: typeof ProtectedConnectionsConnectionIdModuleSlugImport
      parentRoute: typeof ProtectedConnectionsConnectionIdImport
    }
    '/_protected/connections/$connectionId/': {
      preLoaderRoute: typeof ProtectedConnectionsConnectionIdIndexImport
      parentRoute: typeof ProtectedConnectionsConnectionIdImport
    }
    '/_protected/connections/$connectionId/$moduleSlug/': {
      preLoaderRoute: typeof ProtectedConnectionsConnectionIdModuleSlugIndexImport
      parentRoute: typeof ProtectedConnectionsConnectionIdModuleSlugImport
    }
    '/_protected/connections/new/ufsm/': {
      preLoaderRoute: typeof ProtectedConnectionsNewUfsmIndexImport
      parentRoute: typeof ProtectedConnectionsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  ProtectedRoute.addChildren([
    ProtectedAdminRoute.addChildren([
      ProtectedAdminConnectionsRoute,
      ProtectedAdminInvitesRoute,
      ProtectedAdminModulesRoute,
      ProtectedAdminQueueRoute,
      ProtectedAdminUsersRoute,
      ProtectedAdminIndexRoute,
    ]),
    ProtectedConnectionsRoute.addChildren([
      ProtectedConnectionsConnectionIdRoute.addChildren([
        ProtectedConnectionsConnectionIdModuleSlugRoute.addChildren([
          ProtectedConnectionsConnectionIdModuleSlugIndexRoute,
        ]),
        ProtectedConnectionsConnectionIdIndexRoute,
      ]),
      ProtectedConnectionsIndexRoute,
      ProtectedConnectionsNewUfsmIndexRoute,
    ]),
    ProtectedProfileIndexRoute,
  ]),
  AuthIndexRoute,
  AuthCallbackIndexRoute,
  AuthLoginIndexRoute,
])

/* prettier-ignore-end */
