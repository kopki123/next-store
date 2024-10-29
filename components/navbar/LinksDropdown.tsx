import Link from 'next/link';
import { links } from '@/utils/links';
import { SignedOut, SignedIn, SignInButton, SignUpButton } from '@clerk/nextjs';
import { LuAlignLeft } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import SignOutLink from './SignOutLink';
import UserIcon from './UserIcon';
import { auth } from '@clerk/nextjs/server';

function LinksDropdown() {
  const { userId } = auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48' align='start' sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode='modal'>
              <button className='w-full text-left'>Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode='modal'>
              <button className='w-full text-left'>Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        <SignedIn>
          {
            links.map((link) => {
              if (link.label === 'dashboard' && !isAdmin) {
                return null;
              }

              return (
                <DropdownMenuItem key={link.href} className='capitalize w-full'>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              );
            })
          }
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;