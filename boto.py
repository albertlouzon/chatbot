"""
This is the template server side for ChatBot
"""
from bottle import route, run, template, static_file, request
import json


def meta_input_analysis(sentence):
    is_valid_input(sentence)
    if is_valid_input(sentence) == None :
        analyze_by_keywords(sentence)
        if analyze_by_keywords(sentence) == None :
            return "meta analysis : failed to interpret"
        else:
            return analyze_by_keywords(sentence)
    else:
         return is_valid_input(sentence)



def is_valid_input(sentence):
    is_word_detected = False
    bad_words_list = ["fuck", "bitch", 'dick', 'pussy','nazi','motherfucker']
    troll_words_list = ["your mom", "corpse", 'suck']
    main_list = [bad_words_list,troll_words_list]
    if isinstance(sentence, str):
        for sublist in main_list:
            sublist += [word + "s" for word in sublist]
            sublist += [word + "es" for word in sublist]
            for word in sublist:
                if word in sentence and sublist is bad_words_list:
                    answer_by_error = "Words like that don't impress me, hey tough guy !"
                    is_word_detected = True
                elif word in sentence and sublist is troll_words_list:
                    answer_by_error = "I am not 100% sure, but I think you are trolling me !"
                    is_word_detected = True
    chat_answer = None if not is_word_detected else answer_by_error

    return chat_answer


def analyze_by_keywords(sentence):
    is_word_detected = False
    hello_list = ["hi", "hey", "hello", "boker", "chalom", "hola"]
    love_words_list = ["love", "heart","sex",'girlfriend','boyfriend']
    hobbies_words_list = ["sport", "soccer", "football", 'hobbies', 'baseball','leisure','world cup']
    hobbies_words_list += [word + "s" for word in hobbies_words_list ]
    main_list = [hello_list,love_words_list,hobbies_words_list]
    for sublist in main_list:
        for word in sublist:
            if word in sentence and sublist is love_words_list:
                answer_by_keywords = "Love is a human emotion. I would love to feel how it is !"
                is_word_detected = True
            elif word in sentence and sublist is hello_list:
                answer_by_keywords = "hello my friend !"
                is_word_detected = True
            elif word in sentence and sublist is hobbies_words_list:
                answer_by_keywords = "You talk about hobbies? I love soccer and France will win the world cup"
                is_word_detected = True
    chat_answer = None if not is_word_detected else answer_by_keywords

    return chat_answer


@route('/', method='GET')
def index():
    return template("chatbot.html")


@route("/chat", method='POST')
def chat():
    user_message = request.POST.get('msg')
    meta_input_analysis(user_message)
    return json.dumps({"animation": "inlove", "msg":meta_input_analysis(user_message)})


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
