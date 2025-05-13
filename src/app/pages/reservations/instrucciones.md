Ahora mismo si selecciono cantidad de personas y una fecha, me trae todas las mesas que tienen >= a esa capacidad

- poner lista de botones con los 4 horarios disponibles(12, 14, 20 y 22)
- la query debe traer un array con las mesas}

query: trae las mesas que tengan mas que esta capacidad y que su id no se encuentre en la tabla de reservas, con esta fecha y este horario

SELECT \*
FROM tables
WHERE capacity >= :num_guests
AND id NOT IN (
SELECT table_id
FROM reservations
WHERE reservation_date = :date
AND reservation_time = :time
);

Una por cada horario.

- Esto me va a dejar con un array de mesas disponibles por cada horario. Si el array no esta vacio se pinta el boton con ese horario.
