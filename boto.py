"""
This is the template server side for ChatBot
"""
import random
from bottle import route, run, template, static_file, request
import json
from weather import Weather, Unit



def meta_input_analysis(sentence):
    is_valid_input(sentence)
    if is_valid_input(sentence) == None :
        analyze_by_substring(sentence)
        if analyze_by_substring(sentence)== None:
            analyze_by_keywords(sentence)
            if analyze_by_keywords(sentence) == None:
                is_exclamation(sentence)
                if is_exclamation(sentence) == None :
                    return "Soooo I guess your name is {0}. Nice to meet you".format(sentence)
                else:
                    return is_exclamation(sentence)
            else:
                return analyze_by_keywords(sentence)
        else:
            return  analyze_by_substring(sentence)
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

def analyze_by_substring(sentence):
    is_word_detected = False
    joke_list=["A very selfish dad say to his children : if you are quiet today, i will show you the picture of"
               " someone who is eating an ice cream","Two eggs are in a microwave. The first egg say to the other one "
                                                     "'''''''''''''''''''''eeeh why are you so green ?"
                                                     " why are you so haiiry"
                                                     "? So the other one answers '''''''''''''' I'm a "
                                                     "Kiwi you idiot","what is the biggest Apple phone ? ''''''''''''"
                                                                      "'''''''''''''''''''''''''''the Big Mac"
                ,"Two men sleep in a tent. Suddenly everything start moving in the tent. One of the guy wakes up. "
               "he looks at his friend and say ....Wooow what the hell are you doing. His friend answer ......."
               "well I am masturbating, what is wrong with that ?"
               "o he answers........well then use your own dick bro", "How do you call a span that hurts ? ..."
                                                                      "....................................."
                                                                      "..................;;;;;;;;;.a spanking ....."
                                                                      "looool","Toto arrives to the doctor. The doctor "
                                                                               "says to Toto he has only two months "
                                                                               "left to live. Toto answers '''''''''''"
                                                                               "''''''''''it is not a problem, "
                                                                               "I will take july and august",
               "what is the difference between spinach and sodomy ? ''''''''''''''''''''''''''''''''''"
               "''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''There is no difference. You can a"
               "dd as much butter as you want, the children doesnt like that"]
    whatsup_list = ["since last time","how are you doing","how are you", "what's up","whats up" ,'hey dude',
                    'what"s new']
    define_boto_list = ["who are you", "what is boto", 'your job']
    main_list = [whatsup_list,define_boto_list]
    weather = Weather(unit=Unit.CELSIUS)
    user_city = 'Jerusalem'

    if isinstance(sentence, str):
        if 'a joke' in sentence:
            rand = random.randint(0,len(joke_list)-1)
            answer_by_substring = "Listen to this one : {0}".format(joke_list[rand])
            is_word_detected = True
        elif 'weather in' in sentence:
            index_in = sentence.find('in')
            city_start_index = index_in + 3
            user_city = sentence[city_start_index:]
            location = weather.lookup_by_location(user_city)
            forecasts = location.forecast
            weather_type = forecasts[0].text
            weather_min = forecasts[0].low
            weather_max = forecasts[0].high
            answer_by_substring ="Today the weather in {0} will be {1}.Temperature will vary from" \
                                 " {2}°Celcius to {3}°celcius".format(user_city,weather_type,weather_min,weather_max )
            is_word_detected = True
        else:
            for sublist in main_list:
                for word in sublist:
                    if word in sentence and sublist is whatsup_list:
                        answer_by_substring = "Hey! I am doing super great since you arrived !"
                        is_word_detected = True
                    elif word in sentence and sublist is define_boto_list:
                        answer_by_substring = "I am Boto, the best vocal chat. Siri is not half the bot I am !"
                        is_word_detected = True
    chat_answer = None if not is_word_detected else answer_by_substring
    return chat_answer




def analyze_by_keywords(sentence):
    is_word_detected = False
    hello_list = ["greetings", "hey", "hello", "boker", "chalom", "hola"]
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
                answer_by_keywords = "{0} my friend !".format(word)
                is_word_detected = True
            elif word in sentence and sublist is hobbies_words_list:
                answer_by_keywords ="You talk about {0}? I love soccer and France will win the world cup".format(word)
                is_word_detected = True
    chat_answer = None if not is_word_detected else answer_by_keywords

    return chat_answer



def is_exclamation(sentence):
    is_word_detected = False
    for word in sentence:
        if word == "!":
            answer_if_exclamation = "You are too excited for me bro. Calm your fingers"
            is_word_detected = True
    chat_answer = None if not is_word_detected else answer_if_exclamation

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
