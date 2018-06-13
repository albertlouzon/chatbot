import random


def init():
    list_of_answer, dict_of_questions_answers = list(), dict()
    show_question(list_of_answer, dict_of_questions_answers)


def show_question(list_ans, list_dict):
    list_operators, random_num_1, random_num_2 = [
        '+', '-', '*', '/'], random.randint(1, 50), random.randint(1, 50)
    random_operator = random.choice(list_operators)
    try:
        user_answer = float(input(('What is the result of: {0} {1} {2} ? ').format(
            random_num_1, random_operator, random_num_2)))
        is_true_answer(user_answer, random_num_1,
                       random_num_2, random_operator, list_ans, list_dict)
    except ValueError:
        show_question(list_ans, list_dict)


def is_true_answer(answer, num1, num2, operator, list_of_answer, dict_of_questions_answers):

    expected_result = num1 + num2 if operator == "+" else num1 - \
        num2 if operator == "-" else num1 * num2 if operator == "*" else num1 / \
        num2 if operator == "/" and num2 is not 0 else None

    expression_key = str(num1) + "+" + str(num2) + '=' + str(round(expected_result, 2)) if operator == "+" else str(num1) + \
        "-" + \
        str(num2) if operator == "-" else str(num1) + "*" + str(num2) + '=' + \
        str(round(expected_result, 2)) if operator == "*" else str(num1) + "/" + str(num2) + "=" + str(round(expected_result, 2))

    is_another_question = input('Wow you"re so so good! another question ? Y/N ') if round(
        expected_result, 2) == float(answer) else input('Arg! It was ' + str(round(expected_result, 2)) + '...another question  ? ')

    is_good_answer = 'true' if round(
        expected_result, 2) == float(answer) else 'false'
    list_of_answer.append(is_good_answer)
    dict_of_questions_answers[expression_key] = answer
    set_next_question(is_another_question, list_of_answer,
                      dict_of_questions_answers)


def set_next_question(ans, list_ans, dict_ans):
    show_question(list_ans, dict_ans) if ans.lower() in [
        'yes', 'yeah', 'y', 'sure', 'why not'] else feedback_and_exit(list_ans, dict_ans) if ans.lower() in [
        'no', 'nope', 'n'] else print('error')


def feedback_and_exit(list_feedback, dict_ans):
    num_of_good_answers, num_of_bad_answers, average_rate, num_of_answers = 0, 0, 0, len(
        list_feedback)
    for answer in list_feedback:
        num_of_good_answers += 1 if answer == "true" else 0
        num_of_bad_answers += 1 if answer == "false" else 0

    average_rate = num_of_good_answers / num_of_answers if num_of_answers > 0 else 0
    print(('Bye! You have answered correctly {0} out of {1} problems ({2})% .  Feedback: {3}').format(str(
        num_of_good_answers), str(num_of_answers), str(int(average_rate*100)), str(dict_ans)))


init()
