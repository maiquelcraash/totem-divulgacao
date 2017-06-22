-- Gráfico:  1 linhas -- ultimos 7 dias de atividade
   select
		log.date_time::date as "data",
		count (*) as "quantidade"
   from
   		totem_log log,
   		totems tot
   where
   		log.situation in ('0','1')
   and
   		log.ref_totem = tot.code
   group by
   		log.date_time::date
   order by
   		log.date_time::date desc
   limit
   		7;


-- Gráfico: 2 de pizza. Atividade geral por dia da semana

    select
       log.day_week	as "dia",
       count(*)	as "valor"
    from totem_log log
    where
       log.situation in ('0','1')
    group by
       log.day_week
    order by
       "valor" desc;