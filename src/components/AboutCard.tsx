import { ClarityIcon } from './icons/ClarityIcon';
import { PadLockIcon } from './icons/PadLockIcon';
import { SignInIcon } from './icons/SignInIcon';

interface AboutCardProps {
  description: string;
  title: string;
  icon: 'signIn' | 'padLock' | 'clarity';
}

export function AboutCard({ description, icon, title }: AboutCardProps) {
  const icons = {
    signIn: <SignInIcon />,
    padLock: <PadLockIcon />,
    clarity: <ClarityIcon />,
  };

  return (
    <div className="flex items-center mt-14 rounded-full max-w-[400px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex flex-col gap-y-5 items-center justify-center bg-white px-6 py-14">
        <div className="w-[80px] h-[80px] rounded-full bg-[#F3F0EA] flex items-center justify-center">
          {icons[icon]}
        </div>

        <h2 className="font-bold text-xl text-[#303031]">{title}</h2>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
}
