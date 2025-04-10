/* B"H
*/

const { createClient } = require('@supabase/supabase-js')

module.exports = {
    connect(){
        return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)
    }
}