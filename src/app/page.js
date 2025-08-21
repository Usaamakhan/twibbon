export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
        Welcome to Twibbon
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', textAlign: 'center' }}>
        Create Amazing Campaign Frames
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a 
          href="/explore"
          style={{
            backgroundColor: 'white',
            color: '#2563eb',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          Explore Campaigns
        </a>
        <a 
          href="/create"
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '600',
            border: '2px solid white'
          }}
        >
          Create Campaign
        </a>
      </div>
      
      <div style={{ 
        marginTop: '4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        maxWidth: '800px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>50K+</div>
          <div style={{ opacity: 0.8 }}>Active Campaigns</div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2M+</div>
          <div style={{ opacity: 0.8 }}>Downloads</div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>100K+</div>
          <div style={{ opacity: 0.8 }}>Happy Users</div>
        </div>
      </div>
    </div>
  );
}