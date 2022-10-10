function clearTable() {
    $('#results').html(`<tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Текущее время</th>
        <th>Время работы скрипта (мс)</th>
        <th>Результат</th>
    </tr> `);
    //window.localStorage.removeItem('tableData');
    localStorage.clear();
}