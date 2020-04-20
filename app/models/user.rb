class User < ApplicationRecord
  belongs_to :neighbourhood
  belongs_to :city
  belongs_to :province

  SYMPTOMS = [
    'Tos seca',
    'Tos con flema',
    'Fatiga y cansancio',
    'Fiebre',
    'Falta de aire',
    'Dolor muscular',
    'Diarrea',
    'Dolor de cabeza',
    'Dolor de garganta',
    'Perdida de olfato',
    'Perdida sentido del gusto',
    'Nariz congestionada',
    'Nauseas o vomito'
  ]

  QUARANTINED_STATUS = [
    'Encargado de las compras en la casa',
    'Aislado por viaje internacional',
    'Aislado en instalaciones del gobierno',
    'Obligatorio, ordenado por el gobierno',
    'Trabajo desde casa'
  ]

  NOT_QUARANTINED_STATUS = [
    'Trabajo en sector de la salud',
    'Trabajo como personal de servicio a domicilio',
    'Trabajo (OTROS)',
    'Otros motivos'
  ]
end
