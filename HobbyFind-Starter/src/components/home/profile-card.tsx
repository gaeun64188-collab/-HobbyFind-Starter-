import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getProfileCoverImage, Profile } from '@/data/profiles';

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const initials = profile.name
    .split('')
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <Link href={`/profile/${profile.id}`} className="block">
      <Card className="group overflow-hidden border-2 border-[#d9c4aa] bg-[#fffaf4] shadow-[6px_6px_0_#eadac0] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_#e7c9a2]">
        <div className="relative h-28 overflow-hidden border-b-2 border-[#7a5134]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${getProfileCoverImage(profile)}")` }}
          />
          <div className={cn('absolute inset-0 bg-gradient-to-r', profile.accent)} style={{ opacity: 0.55 }} />
        </div>
        <CardContent className="space-y-4 p-5 pt-0">
          <div className="-mt-8 flex items-center justify-between">
            <Avatar className="h-14 w-14 border-4 border-[#fffaf4] shadow-[4px_4px_0_#eadac0]">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`} alt={profile.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <Badge className="border border-[#d8b08d] bg-[#f7ecd8] text-[#5b3d2d] shadow-[2px_2px_0_#eadac0]">
              {profile.category}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-extrabold text-[#4d3a2b]">{profile.name}</h3>
            </div>
            <p className="text-sm font-bold text-[#7a5134]">{profile.title}</p>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-[#5f4b3a]">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map((hobby) => (
              <Badge key={hobby} className="border border-[#e7d7c1] bg-[#f8f1e8] text-[#5f4b3a]">
                {hobby}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between border-t-2 border-[#eadac0] pt-3 text-xs font-bold text-[#5f4b3a]">
            <span>{profile.location}</span>
            <span className="text-[#7a5134]">View profile</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
