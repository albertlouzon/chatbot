"""
This is the template server side for ChatBot
"""
from bottle import route, run, template, static_file, request
import json


def meta_analysis():
    bad_words_list = ["fuck", "bitch", 'dick', 'pussy', 'nazi', 'motherfucker']
    return bad_words_list


def is_valid_input(sentence):
    bad_words_list = ["fuck", "bitch", 'dick', 'pussy','nazi','motherfucker']
    plural_bad_words_list = [word + "s" for word in bad_words_list]
    if sentence in bad_words_list or plural_bad_words_list:
        chat_answer = 'Eh calm down man. Get hit by a truck'
    else :
        chat_answer = None
    return chat_answer

def analyze_by_keywords(sentence):
    hello_list = ["hi","hey","hello","boker","chalom","hola"]
    love_words_list = ["love","sex"]
    if sentence in love_words_list:
        chat_answer = "Love is a human emotion. I would love to feel how it is !"
    elif sentence in hello_list:
        chat_answer = "Hello my friend how are you today?"
    else:
        chat_answer = "i dont understand"
    return chat_answer

@route('/', method='GET')
def index():
    return template("chatbot.html")


@route("/chat", method='POST')
def chat():
    user_message = request.POST.get('msg')
    analyze_by_keywords(user_message)
    return json.dumps({"animation": "inlove", "msg": analyze_by_keywords(user_message)})


@route("/test", method='POST')
def chat():
    user_message = request.POST.get('msg')
    return json.dumps({"animation": "inlove", "msg": user_message})


@route('/js/<filename:re:.*\.js>', method='GET')
def javascripts(filename):
    return static_file(filename, root='js')


@route('/css/<filename:re:.*\.css>', method='GET')
def stylesheets(filename):
    return static_file(filename, root='css')


@route('/images/<filename:re:.*\.(jpg|png|gif|ico)>', method='GET')
def images(filename):
    return static_file(filename, root='images')


def main():
    run(host='localhost', port=7000)

if __name__ == '__main__':
    main()
