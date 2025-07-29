export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  const { secret, slug } = req.query;
  
  // Check for the secret and next parameters
  if (secret !== process.env.PREVIEW_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!slug) {
    return res.status(401).json({ message: "No slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/${slug}`);
};
