const songs = [
               {
                    title: "Cheating on you",
                    artist: "Charlie Puth",
                    image: "./img/channels4_profile.jpg",
                    audio: "./music/Charlie Puth - Cheating on You [Official Video].mp3"
                },
                {
                    title: "Nghe như tình yêu",
                    artist: "HIEUTHUHAI",
                    image: "./img/nnty.jpg",
                    audio: "./music/NgheNhuTinhYeu-HIEUTHUHAI-7045493.mp3"
              },
                {
                     title: "Cơn mưa xa dần",
                    artist: "Sơn Tùng M-TP",
                    image: "./img/artworks-pELUmbg0vZnDS3ls-B1VL2w-t500x500.jpg",
                    audio: "./music/02. Son Tung M-TP - Con Mua Xa Dan.mp3"
                },
                {
                    title: "STAY",
                    artist: "The Kid LAROI, Justin Bieber",
                    image: "./img/stay.jpg",
                    audio: "./music/The Kid LAROI, Justin Bieber - STAY (Official Video).mp3"
                },
                {
                    title: "Haru Haru",
                    artist: "BIGBANG",
                    image: "./img/hrhr.jpg",
                    audio: "./music/Haru-BigBang_3cc37.mp3"
                },
                {
                    title: "Chúng ta của tương lai ",
                    artist: "Sơn Tùng M-TP",
                    image: "./img/Sơn_Tùng_M-TP_-_Chúng_ta_của_tương_lai.png",
                    audio: "./music/ChungTaCuaTuongLai-SonTungMTP-14032595.mp3"
                },
                {
                    title: "Chúng ta của hiện tại",
                    artist: "Sơn Tùng M-TP",
                    image: "./img/chungtacuahientai.jpg",
                    audio: "./music/ChungTaCuaHienTai-SonTungMTP-6892340.mp3"
      }
            ];
            const audio = new Audio();
            let currentIndex = 0;
            let isPlaying = false; // trạng thái phát nhạc
            let isShuffling = false; // Trạng thái shuffle
            let isRepeating = false; // Trạng thái lặp
            let rotationDegree = 0;
            let intervalId;
            const colorThief = new ColorThief();
            const playBtn = document.getElementById('play')
            // Hàm lấy màu và thay đổi màu nền trang
            const changeBackgroundColor = () => {
                const songImage = document.getElementById('song-image');
                if (songImage.complete) {
                    const dominantColor = colorThief.getColor(songImage); // Lấy màu chủ đạo từ ảnh
                    document.body.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`; // Thay đổi màu nền
                }
            };
            // Hàm lấy màu và thay đổi màu nền trang
            const changePlayButtonColor = () => {
                const songImage = document.getElementById('song-image');
                if (songImage.complete) {
                    const dominantColor = colorThief.getColor(songImage); // Lấy màu chủ đạo
                    const playButton = document.getElementById('play');
                    playButton.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`; // Thay đổi màu viền
                }
};
            const totalTime = () => {
                const tongThoiGian = audio.duration; // Lấy tổng thời gian bài hát
                const minutes = Math.floor(tongThoiGian / 60);
                const seconds = Math.floor(tongThoiGian % 60);

                // Thêm 0 vào trước số giây nếu nó nhỏ hơn 10
                const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
                const timeTotal = document.getElementById('total-time');
                timeTotal.textContent = `${minutes}:${formattedSeconds}`; // Hiển thị thời gian


            };
            const updateCurrentTime = () => {
                const timeHientai = audio.currentTime; // Lấy thời gian hiện tại
                const minutesHienTai = Math.floor(timeHientai / 60);
                const secondsHienTai = Math.floor(timeHientai % 60);
                const formattedSecondsHienTai = secondsHienTai < 10 ? `0${secondsHienTai}` : secondsHienTai;

                const timeHienTaiElement = document.getElementById('current-time');
                timeHienTaiElement.textContent = `${minutesHienTai}:${formattedSecondsHienTai}`; // Hiển thị thời gian hiện tại
            };

            // Cập nhật thời gian hiện tại mỗi giây
            setInterval(updateCurrentTime, 1000);

            // Gọi hàm này khi bài hát được tải hoặc bắt đầu phát
            audio.addEventListener('loadedmetadata', totalTime);
            // Render ra bài hát hiện tại
            const displaySong = (index) => {
                const song = songs[index];
                document.getElementById('song-title').textContent = song.title;
                document.getElementById('song-artist').textContent = song.artist;

                const songImage = document.getElementById('song-image');
                songImage.src = song.image;

                // Đảm bảo rằng ảnh được tải trước khi thay đổi màu nền
                songImage.onload = () => {
                    changeBackgroundColor();
                    changePlayButtonColor()
                };
                if (isPlaying) {
                    clearInterval(intervalId); // Dừng xoay cũ
                    intervalId = setInterval(rotateImage, 100); // Bắt đầu xoay lại
                } else {
                    clearInterval(intervalId); // Dừng nếu không phát nhạc
                }

                audio.src = song.audio;
                whatSongIsPlaying(); // Gọi hàm hiển thị bài hát đang phát (nếu có)
            };

            // Hàm xoay hình ảnh
            const rotateImage = () => {
                const songImage = document.getElementById('song-image');
                rotationDegree = (rotationDegree + 1); // Tăng góc xoay
                songImage.style.transform = `rotate(${rotationDegree}deg)`; // Cập nhật góc xoay
            };

            // Phát nhạc và bắt đầu xoay ảnh
            const songPlaying = () => {
                audio.play();
                isPlaying = true;
                tooglePlayPause();  
                intervalId = setInterval(rotateImage, 100); // Xoay ảnh
                
                 
            };
            // Dừng phát nhạc và dừng xoay ảnh
            const songPausing = () => {
                audio.pause();
                isPlaying = false;
                tooglePlayPause();
                clearInterval(intervalId);
             
            };

            // Xử lý sự kiện khi bấm nút phát/tạm dừng
            document.getElementById('play').addEventListener('click', () => {
                if (isPlaying) {
                    songPausing();
                } else {
                    songPlaying();
                }
            });
audio.addEventListener('play', () => {
                isPlaying = true; // Cập nhật trạng thái là đang phát
    playBtn.innerHTML = `<span class="material-icons">pause</span>`; // Cập nhật nút thành pause 
    changePlayButtonColor(); // Thay đổi màu khi bài hát bắt đầu p; // Thay đ��i màu khi bài hát bắt đầu 
            });
            // Hàm phát bài hát khi chọn từ danh sách
            const playSelectedSong = (index) => {
                currentIndex = index; // Cập nhật bài hát đang phát dựa vào chỉ số của bài hát
                displaySong(currentIndex); // Hiển thị thông tin bài hát được chọn

                // Dừng xoay ảnh nếu đang chơi
                if (isPlaying) {
                    clearInterval(intervalId); // Dừng việc xoay
                    rotationDegree = 0; // Reset góc xoay
                }
                songPlaying(); // Phát bài hát
            };

            // Render danh sách bài hát
            const displayUpNext = () => {
                const upNextList = document.getElementById('up-next-list');
                upNextList.innerHTML = ''; // Xóa danh sách hiện tại

                songs.forEach((song, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
            <img src="${song.image}" alt="Song Image">
            <div>
                <span>${song.title}</span>
                <p>${song.artist}</p>
            </div>`;
                    li.className = 'list-item';
                    upNextList.appendChild(li);

                    // Xử lý sự kiện click để phát bài hát
                    li.addEventListener('click', () => {
                        playSelectedSong(index); // Phát bài hát tương ứng
                    });

                    // Đánh dấu bài hát đang phát hiện tại
                    if (index === currentIndex) {
                        li.classList.add('active');
                    }
                });
            };
audio.addEventListener('pause', () => {
     isPlaying = false; // Cập nhật trạng thái là không phát
    playBtn.innerHTML = `<span class="material-icons">play_arrow</span>`; // Cập nhật nút thành play
    clearInterval(intervalId); // Dừng việc xoay ảnh
});
            audio.addEventListener('ended', () => {
                if (isShuffling) {
                    // Chế độ shuffle đang bật, chọn bài ngẫu nhiên
                    currentIndex = Math.floor(Math.random() * songs.length);
                } else {
                    // Chế độ shuffle tắt, chuyển bài tiếp theo trong danh sách
                    currentIndex = (currentIndex + 1) % songs.length;
                }
                displaySong(currentIndex); // Hiển thị bài mới
                whatSongIsPlaying(); // Cập nhật trạng thái bài hát
                changePlayButtonColor()
                 clearInterval(intervalId); // Đảm bảo dừng việc xoay ảnh của bài trước
                intervalId = setInterval(rotateImage, 100); // Bắt đầu xoay ảnh cho bài mới
                audio.play(); // Phát bài mới
            });

             
            const shuffling = () => {
                isShuffling = !isShuffling;

                if (isShuffling) {
                    currentIndex = Math.floor(Math.random() * songs.length);
                    xaoTron.classList.add('actived');
                } else {
                    currentIndex = (currentIndex + 1) % songs.length;
                    xaoTron.classList.remove('actived');
                }

                // Chỉ gọi displaySong và play nếu nhạc không đang dừng
                if (isPlaying) {
                    displaySong(currentIndex);
                    audio.play(); // Đảm bảo tiếp tục phát nhạc
                } else {
                    displaySong(currentIndex); // Cập nhật bài hát mà không dừng
                }

                changePlayButtonColor();

                whatSongIsPlaying();
            }

            const xaoTron = document.getElementById('shuffle')
            xaoTron.addEventListener('click', shuffling)

            //lấy ra bài hát hiện tại
            const getCurrentSong = () => {
                return songs[currentIndex];
            }
            const currentSong = getCurrentSong();

            const whatSongIsPlaying = () => {
                document.querySelectorAll('.list-item').forEach((song, index) => {
                    if (index === currentIndex) {
                        song.classList.add('active')
                    }
                    else {
                        song.classList.remove('active')
                    }
                })
            }

            const repeat = () => {
                isRepeating = !isRepeating;

                if (isRepeating) {
                    repeatBtn.classList.add('actived');
                 
                    audio.loop = true;
                } else {
                    repeatBtn.classList.remove('actived');
      
                    audio.loop = false;
                }
                changePlayButtonColor()

            }

            const repeatBtn = document.getElementById('repeat');
            repeatBtn.addEventListener('click', repeat);
            // nút play và pause 
            const tooglePlayPause = () => {
                if (isPlaying) {
                    playBtn.innerHTML = `<span class="material-icons">pause</span>`
                   
                }
                else if (!isPlaying) {
                    playBtn.innerHTML = `<span class="material-icons">play_arrow</span>`
                   
                }
            }
            const progress = document.getElementById('progress')
            const songDuration = () => { // hiển thị tiến độ bài nhạc
                progress.value = audio.currentTime;
            }
            audio.addEventListener('timeupdate', songDuration);
            // handle xử lí next to bài hát sau
            document.getElementById('next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % songs.length; // Chuyển đến bài tiếp theo
                displaySong(currentIndex); // Hiển thị bài hát mới
                if (isPlaying) {
                    audio.play();
                }
                changePlayButtonColor()
            });

            audio.addEventListener('loadedmetadata', () => {
                progress.max = audio.duration; // Đặt giá trị max của thanh trượt bằng độ dài bài hát
            });
            progress.addEventListener('input', () => {
                audio.currentTime = progress.value; // Cập nhật currentTime của audio
            });
            // handle xử lí quay lại bài hát trước
         document.getElementById('prev').addEventListener('click', handlePrev);
            document.getElementById('prev').addEventListener('touchstart', handlePrev);

            function handlePrev(event) {
                event.preventDefault(); // Ngăn chặn hành vi mặc định nếu cần
                currentIndex = (currentIndex - 1 + songs.length) % songs.length; // Chuyển đến bài trước
                displaySong(currentIndex); // Hiển thị bài hát mới
                if (isPlaying) {
                    audio.play(); // Chỉ phát nếu đang chơi
                }
                changePlayButtonColor(); // Thay đổi màu nút phát; // Thay đ��i màu khi bài hát bắt đầu phá
            }

            const volumeSlider = document.getElementById('volume-slider');

            // Khi người dùng thay đổi giá trị của thanh trượt
            volumeSlider.addEventListener('input', () => {
                audio.volume = volumeSlider.value; // Điều chỉnh âm lượng dựa trên giá trị thanh trượt
            });
            volumeSlider.addEventListener('touchstart', () => { 
                audio.volume = volumeSlider.value; // Điều chỉnh âm lượng dựa trên giá trị thanh trượt
            })
            window.onload = () => {
                displaySong(currentIndex);
                displayUpNext();
            };