  // intentLM — dashboard-published config (dev)
  '/api/intentlm': {
    target: 'https://intentlm-dev-config-krxe5fa7dq-uw.a.run.app',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/intentlm/, '/v1'),
  },