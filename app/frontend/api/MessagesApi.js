// JsFromRoutes CacheKey f70743b361461fce8e09db6b0b869c70
//
// DO NOT MODIFY: This file was automatically generated by JsFromRoutes.
import { definePathHelper } from '@js-from-routes/client'

export default {
  index: /* #__PURE__ */ definePathHelper('get', '/messages'),
  create: /* #__PURE__ */ definePathHelper('post', '/messages'),
  new: /* #__PURE__ */ definePathHelper('get', '/messages/new'),
  edit: /* #__PURE__ */ definePathHelper('get', '/messages/:id/edit'),
  show: /* #__PURE__ */ definePathHelper('get', '/messages/:id'),
  update: /* #__PURE__ */ definePathHelper('patch', '/messages/:id'),
  destroy: /* #__PURE__ */ definePathHelper('delete', '/messages/:id'),
}