import { intervalToDuration } from "date-fns/intervalToDuration"
import { format } from "date-fns/format";

function remainingTime(taskDueDate) {
    const array = taskDueDate.split('-');
    const dueDate = format(new Date(array[0], array[1], array[2]), 'yyyy-MM-dd')
    const todayFormatted = format(new Date(), 'yyyy-MM-dd');

    let remainingTime = intervalToDuration({
        start: dueDate,
        end: todayFormatted
      })

      return remainingTime
}

export {remainingTime}