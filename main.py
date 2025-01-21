import requests
import re
import json
from bs4 import BeautifulSoup

response = requests.get('https://www.happyhouseplants.co.uk/blogs/houseplant-blog')
soup = BeautifulSoup(response.text, 'lxml')

articles = soup.find_all('a', class_='article__title')[:5]  # Only show the first 5 articles

def get_first_two_paragraphs(content):
    if content:
        paragraphs = content.find_all('p')  # Find all <p> tags
        # Get the first two paragraphs if they exist
        first_two = ' '.join([p.get_text().strip() for p in paragraphs[:2] if p.get_text().strip()])
        return first_two if first_two else "No text content found"
    return "No text content found"

article_list = []

for article in articles:
    article_text = article.get_text().strip()
    url = f"https://www.happyhouseplants.co.uk{article['href']}"

    article_response = requests.get(url)
    article_soup = BeautifulSoup(article_response.text, 'lxml')

    date_tag = article_soup.find('time')
    if date_tag and date_tag.has_attr('datetime'):
        publication_date = date_tag['datetime'][:10]
    else:
        publication_date = "Date not found"

    content = article_soup.find('div', class_='rte')
    first_two = get_first_two_paragraphs(content)[:120] + "..."

    article_info = {
        'title': article_text,
        'date': publication_date,
        'sentence': first_two,
        'url': url
    }

    article_list.append(article_info)

with open('./components/articles.json', 'w') as f:     
    json.dump(article_list, f, indent=2)
