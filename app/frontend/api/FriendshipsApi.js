// JsFromRoutes CacheKey 96c84ec9df8c18e6ee3399f571bf3066
//
// DO NOT MODIFY: This file was automatically generated by JsFromRoutes.
import { definePathHelper } from '@js-from-routes/client'

export default {
  index: /* #__PURE__ */ definePathHelper('get', '/friendships'),
  create: /* #__PURE__ */ definePathHelper('post', '/friendships'),
  new: /* #__PURE__ */ definePathHelper('get', '/friendships/new'),
  edit: /* #__PURE__ */ definePathHelper('get', '/friendships/:id/edit'),
  show: /* #__PURE__ */ definePathHelper('get', '/friendships/:id'),
  update: /* #__PURE__ */ definePathHelper('patch', '/friendships/:id'),
  destroy: /* #__PURE__ */ definePathHelper('delete', '/friendships/:id'),
}
