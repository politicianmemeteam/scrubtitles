<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Storage;
use DateTime;
use DateInterval;

class PoliMemesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        //
        if (!defined('DS')) define('DS', DIRECTORY_SEPARATOR);
        $this->request = $request;
        //$this->user = $request->user();

        $this->genre_exclude = array('parsed', 'zroot', '..', '.');
        $this->directory = storage_path('app' . DS . 'ccmashup' . DS . 'subtitles');
        $this->directory_storage = 'ccmashup/subtitles/';   // used with Storage alias
        $this->directory_public = 'ccmashup' . DS . 'subtitles' . DS ;
        $this->subtitle_url = url('subtitle').'/';

    }
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        # Retrieve videos and subtitles and show view

        $get_all = '2';     // specific video by index
        $videos_single = $this->getVideo($get_all);
        $get_all = false;   // random video
        $videos_random = $this->getVideo($get_all);
        $get_all = true;    // all videos
        $videos_all = $this->getVideo($get_all);
dd($videos_all, $videos_single, $videos_random);
        // get json to assoc array values to send to view
        $by_genre = "comedy";
        $single_genre_query = $this->getTrackInfo($by_genre);
        $single_genre_info = json_decode($single_genre_query->getContent(), true);
        $genre_single = $single_genre_info['genre_subtitles'][$by_genre];
        $by_genre = false;
        $all_genres_query = $this->getTrackInfo($by_genre);
        $all_genres_info = json_decode($all_genres_query->getContent(), true);
        $genres_info = $all_genres_info['genre_subtitles'];

        $genres = array('comedy','horror','romance');

    	return view('ccmashup.home', 
            compact('video_single','videos_all','videos_random',
                    'genres_info', 'genre_single', 'parsable',
                    'single_genre_info', 'all_genres_info',
                    'genres'
                    ));

    }
    /**
     * Display a listing of the subtitle resource.
     *
     * @return \Illuminate\Http\Response
     */  
    function displaySubtitle($genre, $filename)
    {
        // Serve subtitle file thru path: /api/v1/subtitle/{genre}/{filename}
        $contents = "No file found";
        /* Public folder paths
        $path = $this->directory_public . DS . $genre . DS . 'parsed' . DS . $filename;
        $path = $this->directory_public . DS . $genre . DS . $filename; 
        $path = $this->directory_storage . $genre . '/parsed/'. $filename;*/
        $path = $this->directory_storage . 'parsed/'. $filename;
        $exists = Storage::disk('local')->has($path);
        if ($exists === false) {
            $path = $this->directory_storage . $genre . '/' . $filename;
            $exists = Storage::disk('local')->has($path);            
        }
        if ($exists) {
            $file = Storage::get($path);
            $mime = Storage::mimeType($path);

            $contents = (new Response($file, 200))
                ->header('Content-Type', $mime)
                ->header('Content-Disposition', 'inline; filename="' . $path . '"');    
        }

        return $contents;
    }
    /**
     * Display a listing of the subtitle resource.
     *
     * @return \Illuminate\Http\Response
     */
    function getVideo($all=true)
    {
        # Read from video_titles table when this is created evt. by user to randomize
        # $src_videos = App\Subtitle::get();
        $src_videos[0] = "http://stm.dam.digizuite.dk/dmm3bwsv3/372_10032_10001_1_2_0_a91f0be4-6ca7-45dd-97b9-873987e294ff.mp4?635885493452760000";
        $src_videos[1] = "http://stm.dam.digizuite.dk/dmm3bwsv3/306_10032_10001_1_2_0_a91f0be4-6ca7-45dd-97b9-873987e294ff.mp4?635885491307190000";
        $src_videos[2] = "http://stm.dam.digizuite.dk/dmm3bwsv3/355_10032_10001_1_2_0_a91f0be4-6ca7-45dd-97b9-873987e294ff.mp4?635885492626700000";
        $src_videos[3] = "http://stm.dam.digizuite.dk/dmm3bwsv3/362_10032_10001_1_2_0_a91f0be4-6ca7-45dd-97b9-873987e294ff.mp4?635885493035970000";
        $src_videos[4] = "https://archive.org/embed/FrankenberryCountChoculaTevevisionCommercial1971";

        $src_videos_count = count($src_videos) - 1;

        if ($all === true) {
            # This is a new random request
            // Retrieve available video to stream
            $video_info = $src_videos;
        } else {
            $rand = ($all !== false && $all >= 0 && $all <= $src_videos_count) ? $all : mt_rand(0, $src_videos_count);
            $video_info[0] = $src_videos[$rand];
        }

        if (!$this->request->ajax()) {
            return $video_info;
        }
        return response()->json(array (
                                'video_info'        => $video_info,
                                'bool_flag'         => "success"
                                ));
    }

function getTrackInfo($genre = false)
{
    if ($genre === false) {
        $src_genres = scandir($this->directory, 1);
        foreach ($src_genres as $valid_genre) {
            $genre_directory = $this->directory . DS . $valid_genre;
            if (in_array($valid_genre, $this->genre_exclude) === false
                && is_dir($genre_directory) === true) {
                $genres[] = $valid_genre;
                $genre_subtitles[$valid_genre] = $this->getGenreSubtitles($valid_genre);
            }            
        }
    } else {
        // get by genre
        $valid_genre = $genre;
        $genre_directory = $this->directory . DS . $valid_genre;
        if (in_array($valid_genre, $this->genre_exclude) === false
            && is_dir($genre_directory) === true) {
            $genres[] = $valid_genre;
            $genre_subtitles[$valid_genre] = $this->getGenreSubtitles($valid_genre);
        }            
    }

    $tracks_info = array( 
        'genres' => $genres,
        'genre_subtitles' => $genre_subtitles,
         );

    if ($this->request->ajax()) {
        return $tracks_info;
    }
    return response()->json(array (
                            'genres'            => $genres,
                            'genre_subtitles'   => $genre_subtitles,
                            'tracks_info'       => $tracks_info,
                            'bool_flag'         => "success"
                            ));
}

function getGenreSubtitles($valid_genre)
{
    $genre_directory = $this->directory . DS . $valid_genre;
    $genre_url = $this->subtitle_url.$valid_genre.'/';

    $genre_contents = scandir($genre_directory, 1);
    foreach($genre_contents as $genre_content) {
        if (in_array($genre_content, $this->genre_exclude) === false 
            && is_dir($genre_content) === false ) :
            $path = $this->directory_storage. $valid_genre.'/'.$genre_content;
            $src_mime = Storage::mimeType($path);
            $src_kind = "subtitles";
            $src_lang = "en";
            $title_orig_url = $genre_url.$genre_content;
            $title_url_json = $this->getParsedFiles($valid_genre, $genre_content);
            $title_url = ($title_url_json === false ) ? array("parsed_url" => "Original file does not exist")
                : json_decode($title_url_json->getContent(), true); 
            $genre_subtitles[] = array(
                'title_orig_url'    => $title_orig_url,
                'title_url'         => $title_url['parsed_url'],
                'title'             => $genre_content,
                'kind'              => $src_kind,
                'type'              => $src_mime,
                'lang'              => $src_lang,
                );
        endif;
    }

    return $genre_subtitles;
}

function getParsedFiles($valid_genre, $id, $offset=0)
{
    // Returns full path to subtitle file that is rewritten 
    // Rewritten file is "scrubbed" with new time indices
    // AND stored with offset index number in title
    //  1) Return the "original file" or file at position of index
    //  2) Create the "scrubbed forward file" or file at position plus seconds increment

    # $valid_genre will come from the database when filenames are stored there so this can be removed then
    $bool_flag = true;
    $bool_flag_next = true;
    $genre_directory = $this->directory . DS . $valid_genre;
    # Used with Storage alias
    $path_genre = $this->directory_storage.$valid_genre;
    $path_parse = $this->directory_storage.'parsed';
    $genre_url = $this->subtitle_url.$valid_genre.'/';

    $offset = $this->request->input('offset') ? $this->request->input('offset') : $offset;
    $id = $this->request->input('id') ? $this->request->input('id') : $id;

    $file_to_parse = $path_genre  . '/' .  $id;
    $exists_file_to_parse = Storage::disk('local')->has($file_to_parse);
    if ($exists_file_to_parse === false) return false;

    $parse_file_to = $path_parse . '/' . $offset . '_' . $id;
    $exists = Storage::disk('local')->has($parse_file_to);

    if (!$exists) {
        $bool_flag = ($this->parseFile($file_to_parse, $parse_file_to, $offset))
            ? $offset . '_' . $id : "parse_error";
    } 
    $offset_next = $offset + 1;
    $parse_file_to = $path_parse . '/' . $offset_next . '_' . $id;
    $exists = Storage::disk('local')->has($parse_file_to);
    if (!$exists) {
        $bool_flag_next = ($this->parseFile($file_to_parse, $parse_file_to, $offset_next))
            ? $genre_url . $offset_next . '_' . $id : "parse_error_next";
    }

    $parsed_url = $genre_url . $offset . '_' . $id;
    $parsed_url_next = $genre_url . $offset_next . '_' . $id;

    return response()->json(array (
                            'parsed_url'        => $parsed_url,
                            'bool_flag'         => $bool_flag,
                            'parsed_url_next'   => $parsed_url_next,
                            'bool_flag_next'    => $bool_flag_next,
                            ));
}

function parseFile($file_to_parse, $parse_file_to, $offset)
{
    // Returns true if file scrubbed successfully; false for all else
    $return_flag = false;
    $content = Storage::get($file_to_parse); 
    $txt_file = mb_convert_encoding($content, 'UTF-8', 
        mb_detect_encoding($content, 'UTF-8, ISO-8859-1', true));
    $eols = array(",","\n","\r","\r\n");

        $i=0;
    foreach ($eols as $eol) {
        $contains = strpos($txt_file, $eol);
        if ($contains) $index = $i;
        $i++;        
    }
    $orig_rows = explode($eols[$index], $txt_file);

    $rows_formatted = array();
    $rows_formatted_scrub = array();
    $webvtt = "WEBVTT".$eols[$index].$eols[$index];

    $scrub_date = new DateTime('00:00:00.000');
    $scrub_offset = new DateInterval('PT1S');
    $scrub_interval = new DateInterval('PT5S'); // fixed interval scrub

    $time_start = $scrub_date->format('H:i:s');
    $scrub_date->add($scrub_interval);
    $time_end = $scrub_date->format('H:i:s');

    $time_end = $time_start;


    $time_start_prev = $time_start;
    $time_end_prev = $time_end;

    if (stripos($orig_rows[0], "webvtt") === false) {
        array_push($rows_formatted, $webvtt);
        array_push($rows_formatted_scrub, $webvtt);
    }

    $i=0;
    $first_row_scrub_flag = true;
    foreach ($orig_rows as $row) {
        $row_scrub = $row;
        if (stripos($row, "-->")) {
            // extract duration for each row and increment time end
            $text=$row;
            $duration_date = new DateTime($time_end);

            $index_sec = strrpos($text, ":");
            $text2=substr($text, 0,  strpos($text, "-->"));
            $index_sec2 = strrpos( $text2 , ":");

            $time_end_dur = substr($text, $index_sec+1, 2);
            $time_end_ms = substr($text, $index_sec+3, 4);
            $time_start_dur = substr($text2, $index_sec2+1, 2);
            $time_start_orig = $time_start_dur;
            $time_start_ms = substr($text2, $index_sec2+3, 4);
            $duration_passage = (($time_end_dur - $time_start_dur) < 0) 
                ? ((60 - $time_start_dur) + $time_end_dur) + 2 
                : ($time_end_dur - $time_start_dur) + 2;
            $interval_string = 'PT'.$duration_passage.'S';     // dynamic interval scrub
            $duration_interval = new DateInterval($interval_string);

            $duration_date->add($duration_interval);
            $time_end = $duration_date->format('H:i:s');

            $row = $time_start.$time_start_ms." --> ".$time_end.$time_end_ms;
            if ($i >= $offset) {
                if ($first_row_scrub_flag == true) {
                    $row_scrub = "00:00:00".$time_start_ms." --> ".$time_end_prev.$time_end_ms;
                    $first_row_scrub_flag = false;
                } else {
                    $row_scrub = $time_start_prev.$time_start_ms." --> ".$time_end_prev.$time_end_ms;
                    $first_row_scrub_flag = false;
                }                
            } else {
                $row_scrub = "99:99:99.000 --> 99:99:99.000";               
            }

            $i++;
            $time_start_prev = $time_start;
            $time_end_prev = $time_end;
            $scrub_date = new DateTime($time_end);
            $scrub_date->add($scrub_offset);
            $time_start = $scrub_date->format('H:i:s');

        }
        $row_formatted = $row.$eols[$index];
        $row_formatted_scrub = $row_scrub.$eols[$index];
        array_push($rows_formatted, $row_formatted);
        array_push($rows_formatted_scrub, $row_formatted_scrub); 
    }

    $return_flag = ($offset === 0) ? 
        Storage::put( $parse_file_to , $rows_formatted ) :
        Storage::put( $parse_file_to , $rows_formatted_scrub );

    return $return_flag;

    //$content = file_get_contents($file_to_parse); 
    //$return_flag = file_put_contents ( $parse_file_to , $rows_formatted );
}

function displayVideo($filename)
{
    # for debug setting memory limit dynamically higher to 1G ini_set('memory_limit','1000M');
    $path = 'ccmashup/video/'.$filename.'.mp4';
    $file = Storage::disk('local')->get($path);
    $mime = Storage::mimeType($path);
    $size = Storage::size($path);

    return (new Response($file, 200))
              ->header('Content-Type', $mime)
              ->header('Content-Disposition', 'inline; filename="' . $path . '"');

}

function putSubtitle($filename)
{
    $mime = 'video/mp4';
    # for debug setting memory limit dynamically higher to 1G ini_set('memory_limit','1000M');
    $path = 'ccmashup'.DS.'video' . DS . $filename.'.mp4';
    $filesaved = Storage::put($path, $contents);
        return ($filesaved);
}


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
