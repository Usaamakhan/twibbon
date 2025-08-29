import Link from 'next/link';
import Image from 'next/image';

export default function CampaignCard({ campaign, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="card card-campaign animate-pulse">
        <div className="card-campaign-image bg-gray-200"></div>
        <div className="card-campaign-content">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="flex items-center gap-2 mt-auto">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/campaign/${campaign.id}`} className="card card-campaign">
      <div className="card-campaign-image">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="card-campaign-content">
        <h3 className="card-campaign-title">{campaign.title}</h3>
        
        <div className="card-campaign-creator">
          <div className="card-campaign-avatar">
            <Image
              src={campaign.avatar}
              alt={campaign.creator}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{campaign.creator}</div>
            <div className="card-campaign-meta">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              {campaign.supporters} Supporters
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
