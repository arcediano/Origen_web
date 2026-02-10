/**
 * Página principal
 * @description Redirige a la página de registro
 */

import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/register');
}
