# Typescript

Since Firewings can be used in the Client SDK aswell as Firebase-Admin SDK, typing is a bit tricky.

We provide 2 type definitions, either for the Client SDK or the Admin SDK (both under constuction).
Just add the relevant type definition file to your tsconfig.json:

```js
"types": [
      // For Client SDK
      "firewings/types/client",
      // For Admin SDK
      "firewings/types/admin"
      ]
```

::: warning
We're a bit behind with typing - not all typings are available yet.

See the current typings [here](https://github.com/lupas/firewings/tree/master/types).

If you need more, please write them and contribute them with a PR!
:::