import Link from 'next/link';
import Image from 'next/image';

export default function CampaignCard({ campaign }) {
  const {
    id,
    title,
    description,
    hashtag,
    thumbnail,
    participantCount,
    category,
    creator
  } = campaign;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/campaign/${id}`}>
        <div className="relative">
          <div className="aspect-w-16 aspect-h-10 bg-gray-200">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
              {category}
            </span>
          </div>

          {/* Participant Count */}
          <div className="absolute top-3 right-3">
            <div className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              {participantCount.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
              {hashtag}
            </span>
            <span className="text-xs text-gray-500">
              by {creator}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}