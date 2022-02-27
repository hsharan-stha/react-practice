
function DataTable(props) {


    const { data, column } = props

    return (
        <table className='table'>
            <thead>
                <tr>
                    {

                        column.map((h, k) =>
                            <th key={k}>{h.name}</th>
                        )
                    }


                </tr>
            </thead>
            <tbody>
                {
                    data.map((d, k) =>
                        <tr key={k}>
                            {
                                column.map((h, l) =>
                                    <td key={l}>{d[h.key]}</td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default DataTable