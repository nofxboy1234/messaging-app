import { router } from '@inertiajs/react';

router.on('invalid', (event) => {
  event.preventDefault();
});
