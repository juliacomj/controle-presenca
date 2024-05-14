/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }]],
        missingSuspenseWithCSRBailout: false,
      },
    images:{
      remotePatterns:[{
        protocol: 'https',
        hostname: 'ohxesicgszkzclerpknr.supabase.co',
        port: '',
        pathname: '/storage/v1/s3',
      }, 
      {
        protocol: 'https',
        hostname: 'ohxesicgszkzclerpknr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/presenca-bucket/',
      }
    ]
  }
};

export default nextConfig;
