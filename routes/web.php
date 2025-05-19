<?php

// routes/web.php
Route::get('/{any}', fn () => view('spa'))->where('any', '.*');
