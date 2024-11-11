import { router } from '@inertiajs/react';

console.log('set up callback for invalid inertia events');
router.on('invalid', (event) => {
  event.preventDefault();
});
