export default function TopCreators() {
  const creators = [
    { rank: 1, name: 'Penerangan...', supporters: '86K', avatar: 'P' },
    { rank: 2, name: 'Kay Unpam', supporters: '12K', avatar: 'K' },
    { rank: 3, name: 'Frontier', supporters: '30K', avatar: 'F' },
    { rank: 4, name: 'socmed kpm', supporters: '75K', avatar: 'S' },
    { rank: 5, name: 'PBAK UIN Suna...', supporters: '6.9K', avatar: 'P' },
    { rank: 6, name: 'Rakesh Kumar...', supporters: '30K', avatar: 'R' },
    { rank: 7, name: 'Mork Seavlong', supporters: '5.7K', avatar: 'M' },
    { rank: 8, name: 'noname', supporters: '5.5K', avatar: 'N' },
    { rank: 9, name: 'Ani Dwi', supporters: '5.2K', avatar: 'A' }
  ];

  return (
    <div className="grid-creators">
      {creators.map((creator) => (
        <div key={creator.rank} className="creator-card">
          <div className="creator-rank">#{creator.rank}</div>
          <div className="creator-avatar">{creator.avatar}</div>
          <div className="creator-info">
            <div className="creator-name">{creator.name}</div>
            <div className="creator-supporters">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              {creator.supporters} Supporters
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
