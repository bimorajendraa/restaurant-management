import envConfig, { API_URL, CLIENT_ORIGINS } from '@/config'
import prisma from '@/database'
import { initOwnerAccount } from '@/controllers/account.controller'
import autoRemoveRefreshTokenJob from '@/jobs/autoRemoveRefreshToken.job'
import { errorHandlerPlugin } from '@/plugins/errorHandler.plugins'
import { socketPlugin } from '@/plugins/socket.plugins'
import validatorCompilerPlugin from '@/plugins/validatorCompiler.plugins'
import accountRoutes from '@/routes/account.route'
import authRoutes from '@/routes/auth.route'
import dishRoutes from '@/routes/dish.route'
import guestRoutes from '@/routes/guest.route'
import indicatorRoutes from '@/routes/indicator.route'
import mediaRoutes from '@/routes/media.route'
import orderRoutes from '@/routes/order.route'
import staticRoutes from '@/routes/static.route'
import tablesRoutes from '@/routes/table.route'
import testRoutes from '@/routes/test.route'
import { createFolder } from '@/utils/helpers'
import fastifyAuth from '@fastify/auth'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import Fastify from 'fastify'
import fastifySocketIO from 'fastify-socket.io'
import path from 'path'

const fastify = Fastify({
  logger: false
})

const start = async () => {
  try {
    fastify.get('/health', async () => {
      await prisma.$queryRaw`SELECT 1`
      return {
        ok: true,
        database: 'ok'
      }
    })

    createFolder(path.resolve(envConfig.UPLOAD_FOLDER))
    autoRemoveRefreshTokenJob()

    fastify.register(cors, {
      origin: CLIENT_ORIGINS,
      credentials: true
    })

    fastify.register(fastifyAuth, {
      defaultRelation: 'and'
    })
    fastify.register(fastifyHelmet, {
      crossOriginResourcePolicy: {
        policy: 'cross-origin'
      }
    })
    fastify.register(fastifyCookie)
    fastify.register(validatorCompilerPlugin)
    fastify.register(errorHandlerPlugin)
    fastify.register(fastifySocketIO, {
      cors: {
        origin: CLIENT_ORIGINS,
        credentials: true
      }
    })
    fastify.register(socketPlugin)
    fastify.register(authRoutes, {
      prefix: '/auth'
    })
    fastify.register(accountRoutes, {
      prefix: '/accounts'
    })
    fastify.register(mediaRoutes, {
      prefix: '/media'
    })
    fastify.register(staticRoutes, {
      prefix: '/static'
    })
    fastify.register(dishRoutes, {
      prefix: '/dishes'
    })
    fastify.register(tablesRoutes, {
      prefix: '/tables'
    })
    fastify.register(orderRoutes, {
      prefix: '/orders'
    })
    fastify.register(testRoutes, {
      prefix: '/test'
    })
    fastify.register(guestRoutes, {
      prefix: '/guest'
    })
    fastify.register(indicatorRoutes, {
      prefix: '/indicators'
    })

    await initOwnerAccount()
    await fastify.listen({
      port: Number(process.env.PORT || envConfig.PORT || 4000),
      host: envConfig.DOCKER_HOST || '0.0.0.0'
    })

    console.log(`Server is running: ${API_URL}`)
    console.log(`Server is listening on ${envConfig.DOCKER_HOST}:${process.env.PORT || envConfig.PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
