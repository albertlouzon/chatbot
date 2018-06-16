"""
This is the template server side for ChatBot
"""
import random
from bottle import route, run, template, static_file, request
import json
from weather import Weather, Unit


def meta_input_analysis(sentence,animation):
    is_valid_input(sentence,animation)
    if is_valid_input(sentence,animation) == None :
        analyze_by_substring(sentence,animation)
        if analyze_by_substring(sentence,animation)== None:
            analyze_by_keywords(sentence,animation)
            if analyze_by_keywords(sentence,animation) == None:
                is_exclamation(sentence,animation)
                if is_exclamation(sentence,animation) == None :
                    tepu = ("Sooo I guess your name is {0}. Nice to meet you".format(sentence),'excited')
                    return tepu
                else:
                    return is_exclamation(sentence,animation)
            else:
                return analyze_by_keywords(sentence,animation)
        else:
            return  analyze_by_substring(sentence,animation)
    else:
        return is_valid_input(sentence,animation)



def is_valid_input(sentence,animation):
    is_word_detected = False
    bad_words_list = ["fuck", "bitch", 'dick', 'pussy','nazi','motherfucker']
    troll_words_list = ["your mom", "corpse", 'suck',"porn"]
    main_list = [bad_words_list,troll_words_list]
    if isinstance(sentence, str):
        for sublist in main_list:
            sublist += [word + "s" for word in sublist]
            sublist += [word + "es" for word in sublist]
            for word in sublist:
                if word in sentence and sublist is bad_words_list:
                    answer_by_error = "Words like that don't impress me, hey tough guy !"
                    animation = 'no'
                    is_word_detected = True
                elif word in sentence and sublist is troll_words_list:
                    answer_by_error = "I am not 100% sure, but I think you are trolling me!"
                    animation = 'confused'
                    is_word_detected = True
    chat_answer = None if not is_word_detected else (answer_by_error,animation)

    return chat_answer

def analyze_by_substring(sentence,animation):
    is_word_detected = False
    joke_list=["A very selfish dad say to his children : if you are quiet today, i will show you the picture of"
               " someone who is eating an ice cream","Two eggs are in a microwave. The first egg say to the other one "
                                                     "'''''''''''''''''''''eeeh why are you so green ?"
                                                     " why are you so haiiry"
                                                     "? So the other one answers '''''''''''''' I'm a "
                                                     "Kiwi you idiot","what is the biggest Apple phone ? ''''''''''''"
                                                                      "'''''''''''''''''''''''''''the Big Mac"
                , "How do you call a span that hurts ? ..."
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

    if isinstance(sentence, str):
        if 'a joke' in sentence:
            rand = random.randint(0,len(joke_list)-1)
            answer_by_substring = "Listen to this one : {0}".format(joke_list[rand])
            animation = "laughing"
            is_word_detected = True
        elif 'weather in' in sentence:
            index_in = sentence.find('in')
            city_start_index = index_in + 3
            user_city = sentence[city_start_index:]
            location = weather.lookup_by_location(user_city)
            if location == None:
                is_word_detected = False
            else:
                forecasts = location.forecast
                weather_type = forecasts[0].text
                weather_min = forecasts[0].low
                weather_max = forecasts[0].high
                answer_by_substring ="Today the weather in {0} will be {1}.Temperature will vary from" \
                                     " {2}°Celcius to {3}°Celcius".format(user_city,weather_type,
                                                                          weather_min,weather_max )
                animation = "waiting"
                is_word_detected = True
        else:
            for sublist in main_list:
                for word in sublist:
                    if word in sentence and sublist is whatsup_list:
                        answer_by_substring = "Hey! I am doing super great since you arrived !"
                        is_word_detected = True
                        animation = "dog"
                    elif word in sentence and sublist is define_boto_list:
                        answer_by_substring = "I am Boto, the best vocal chat. Siri is not half the bot I am !"
                        animation = "dancing"
                        is_word_detected = True
    chat_answer = None if not is_word_detected else (answer_by_substring,animation)
    return chat_answer




def analyze_by_keywords(sentence,animation):
    is_word_detected = False
    hello_list = ["greetings", "hey", "hello", "boker", "chalom", "hola"]
    love_words_list = ["love", "heart","sex",'girlfriend','boyfriend']
    hobbies_words_list = ["sport", "soccer", "football", 'hobbies', 'baseball','leisure','world cup']
    hobbies_words_list += [word + "s" for word in hobbies_words_list ]
    activities_list = ["shopping", "coffee", "hang out", "party", "drink", "laugh","cinema","cream"]
    religion_list = ["hachem", "god", "allah", "allah akbar", "believer", "satan",
                     "darwin", "evolutionnism","bible","torah"]
    doesnt_exist_list = ["santa", "palestine", "alien", "monster", "ghost"]
    music_list = ["youtube", "spotify", "music", "lyric", "hip hop", "rnb",'song']
    music_list += [word + "s" for word in music_list]
    activities_list += [word + "s" for word in activities_list]
    religion_list += [word + "s" for word in religion_list]
    doesnt_exist_list += [word + "s" for word in doesnt_exist_list]
    main_list = [hello_list,love_words_list,hobbies_words_list,
                 activities_list,religion_list,doesnt_exist_list,music_list]
    for sublist in main_list:
        for word in sublist:
            if word in sentence and sublist is love_words_list:
                answer_by_keywords = "Love is a human emotion. I would love to feel how it is !"
                animation = "heartbroke"
                is_word_detected = True
            elif word in sentence and sublist is hello_list:
                answer_by_keywords = "{0} my friend !".format(word)
                is_word_detected = True
                animation = "ok"
            elif word in sentence and sublist is hobbies_words_list:
                answer_by_keywords ="You talk about {0}? I love soccer and France will win the world cup".format(word)
                animation = "inlove"
                is_word_detected = True
            elif word in sentence and sublist is activities_list:
                answer_by_keywords ="{0} would be a wonderful activity to do with you!!!".format(word)
                animation = "takeoff"
                is_word_detected = True
            elif word in sentence and sublist is religion_list:
                answer_by_keywords ="My spirituality is quite limited. I believe that 2 + 2 = 4".format(word)
                animation = "takeoff"
                is_word_detected = True
            elif word in sentence and sublist is doesnt_exist_list:
                answer_by_keywords ="{0} does not exist bro. Deal with it".format(word)
                animation = "giggling"
                is_word_detected = True
    chat_answer = None if not is_word_detected else (answer_by_keywords,animation)

    return chat_answer



def is_exclamation(sentence,animation):
    is_word_detected = False
    for word in sentence:
        if word == "!":
            answer_if_exclamation = "You are too excited for me bro. Calm your fingers"
            animation = "giggling"
            is_word_detected = True
    chat_answer = None if not is_word_detected else (answer_if_exclamation,animation)

    return chat_answer


@route('/', method='GET')
def index():
    return template("chatbot.html")


@route("/chat", method='POST')
def chat():
    boto_animation = "ok"
    user_message = request.POST.get('msg')
    meta_input_analysis(user_message,boto_animation)
    return json.dumps({"animation": meta_input_analysis(user_message,boto_animation)[1],
                       "msg": meta_input_analysis(user_message,boto_animation)[0]})


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
