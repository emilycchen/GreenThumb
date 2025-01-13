import requests
import re
from bs4 import BeautifulSoup

response = requests.get('https://www.happyhouseplants.co.uk/blogs/houseplant-blog')
soup = BeautifulSoup(response.text, 'lxml')

articles = soup.find_all('a', class_='article__title')[:5] # I only want to show the first 5 articles

def get_first_text_paragraph(content):
    # Look through all paragraphs until we find one with actual text (since some articles begin with images, without this portion of code we would not be able to get text)
    if content:
        paragraphs = content.find_all('p')
        for para in paragraphs:
            # Skip empty paragraphs or those containing only images
            if para.get_text().strip() and not para.find('img'):
                return para.get_text().strip()
    return "No text content found"

# Iterate over the titles and blurbs
for article in articles:

    article_text = article.get_text()

    url = article['href']

    article_response = requests.get(f"https://www.happyhouseplants.co.uk{url}")
    article_soup = BeautifulSoup(article_response.text, 'lxml')

    content = article_soup.find('div', class_='rte')

    first_para = get_first_text_paragraph(content)

    if first_para != "No text content found":
        first_sentence = re.split('[.!?]', first_para)[0] + '.'
    else:
        first_sentence = first_para
    
    print(f"Headline: {article_text}")
    print(f"Blurb: {first_sentence}")
    print(f"URL: https://www.happyhouseplants.co.uk{url}")
    print("-" * 50)