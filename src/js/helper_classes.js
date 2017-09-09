function removeFromArray(array, value) {
    var i = array.length;
    while (i--) {
        if (array[i] === value) { array.splice(i, 1); }
    }
}