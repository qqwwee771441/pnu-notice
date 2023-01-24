export default function FindWithTags(notices, keywords) {
  return notices.filter((item) => {
    for(const key in keywords) {
      if(item.title.includes(keywords[key].text))
        return true;
    }
    return false;
  });
}
