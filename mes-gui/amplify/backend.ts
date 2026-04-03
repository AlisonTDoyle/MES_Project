import { defineBackend } from '@aws-amplify/backend';
<<<<<<< HEAD

defineBackend({
    auth
});
=======
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
});
>>>>>>> parent of 8ebd856 (made application buildable)
