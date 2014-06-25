#!/usr/bin/perl
if(@ARGV != 1) {
    print "Usage: ./preview <VIDEO_URL>\n";
    exit 1;
}

system("hash preview");
if($? != 0) {
    print "Error: The preview binary must be on your PATH\n";
    exit 2;
}

my $url = $ARGV[0];
my $loc = `preview renderV2 --verbose --verbose localhost:8080 --template video $url 2>&1`;

if($loc =~ /{"Key":"streamingUrl","Value":\["(.+)"\]/) {
    $loc = $1;
    print "Writing URL $loc to source.json\n";
    open(my $fh, '>', "source.json");
    print $fh '{"source":"' . $loc . '"}';
    close($fh);
} else {
    print "Invalid preview output. VIDEO_URL must be a valid URL and the preview daemon must be running.\n";
}
