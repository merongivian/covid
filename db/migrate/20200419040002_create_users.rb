class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.integer :age
      t.string :sex
      t.string :zip_code
      t.boolean :tested
      t.boolean :contact_with_sick_person
      t.text :symptoms, array: true, default: []
      t.boolean :with_severe_illness
      t.boolean :quarantined
      t.string :quarantined_status
      t.string :smoking_habits
      t.integer :temperature
      t.boolean :privacy_agreement
      t.string :coordinates
      t.references :province
      t.references :city
      t.references :neighbourhood

      t.timestamps
    end
  end
end
