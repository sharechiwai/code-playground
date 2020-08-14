const baseUrl = 'https://www.instagram.com/';
const InstagramHelper = {
  getIgByHashtag: async (hashtag) => {
    const cleanedHashtag = InstagramHelper.removeNonAlphanumericChars(hashtag);
    const response = await fetch(
      `${baseUrl}explore/tags/${cleanedHashtag}/?__a=1`,
    );
    const data = await response.json();
    const result = data.graphql.hashtag.edge_hashtag_to_media.edges;
    const ig = result.map((a) => {
      const node = a.node;
      const igInfo = {};
      igInfo.shortcode = node.shortcode;
      igInfo.id = node.id;
      igInfo.display_url = node.display_url;
      igInfo.caption =
        node.edge_media_to_caption.edges.length > 0
          ? node.edge_media_to_caption.edges[0].node.text
          : '';
      igInfo.timestamp = node.taken_at_timestamp;
      igInfo.thumbnail_src = node.thumbnail_src;
      igInfo.thumbnail_resources = node.thumbnail_resources;
      igInfo.is_video = node.is_video;
      igInfo.ownerId = node.owner.id;
      return igInfo;
    });
    return ig;
  },
  removeNonAlphanumericChars: (text) => {
    return text.replace(/\W/g, '');
  },
};

export default InstagramHelper;
