/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        swcPlugins: [['fluentui-next-appdir-directive', { paths: ['@griffel', '@fluentui'] }]],
      },
    images:{
      domains:['ohxesicgszkzclerpknr.supabase.co']
    }
};

export default nextConfig;
